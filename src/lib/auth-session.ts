import type { NextRequest } from 'next/server';

const SESSION_VERSION = 1;
const SESSION_COOKIE_NAME = 'github_oauth_session';
const STATE_COOKIE_NAME = 'github_oauth_state';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const STATE_MAX_AGE_SECONDS = 60 * 10;

// AES-GCM auth tag length in bytes
const TAG_LENGTH = 16;

interface SessionUser {
  login: string;
  avatarUrl: string;
}

interface StoredAuthSession {
  version: number;
  accessToken: string;
  user: SessionUser;
  expiresAt: number;
}

export interface AuthSession {
  accessToken: string;
  user: SessionUser;
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };
export { STATE_COOKIE_NAME, STATE_MAX_AGE_SECONDS };

// ── Helpers ──────────────────────────────────────────────────────────

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(str: string): Uint8Array<ArrayBuffer> {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const paddingLength = (4 - (base64.length % 4)) % 4;
  if (paddingLength === 3) {
    throw new Error('Invalid base64url string');
  }

  const padded = `${base64}${'='.repeat(paddingLength)}`;
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// ── Public utilities ─────────────────────────────────────────────────

export function hasGithubOAuthConfig() {
  return Boolean(
    process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET,
  );
}

export function createOAuthState() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
}

// ── Session key ──────────────────────────────────────────────────────

async function getSessionKey(): Promise<CryptoKey | null> {
  const secret = process.env.GITHUB_CLIENT_SECRET;
  if (!secret) {
    return null;
  }

  const encoded = new TextEncoder().encode(secret);
  const hash = await crypto.subtle.digest('SHA-256', encoded);

  return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ]);
}

// ── Encode / Decode ──────────────────────────────────────────────────

export async function encodeAuthSession(
  session: AuthSession,
): Promise<string | null> {
  const key = await getSessionKey();
  if (!key) {
    return null;
  }

  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);

  const payload: StoredAuthSession = {
    version: SESSION_VERSION,
    accessToken: session.accessToken,
    user: session.user,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };

  const plaintext = new TextEncoder().encode(JSON.stringify(payload));

  // Web Crypto AES-GCM returns ciphertext || authTag (tag is last 16 bytes)
  const combined = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext),
  );

  const encrypted = combined.slice(0, combined.length - TAG_LENGTH);
  const tag = combined.slice(combined.length - TAG_LENGTH);

  return `${toBase64Url(iv)}.${toBase64Url(tag)}.${toBase64Url(encrypted)}`;
}

export async function decodeAuthSession(
  value: string | undefined,
): Promise<AuthSession | null> {
  if (!value) {
    return null;
  }

  const key = await getSessionKey();
  if (!key) {
    return null;
  }

  const parts = value.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [ivPart, tagPart, encryptedPart] = parts;

  try {
    const iv = fromBase64Url(ivPart);
    const tag = fromBase64Url(tagPart);
    const encrypted = fromBase64Url(encryptedPart);

    // Web Crypto expects ciphertext || authTag concatenated
    const combined = new Uint8Array(encrypted.length + tag.length);
    combined.set(encrypted);
    combined.set(tag, encrypted.length);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      combined,
    );

    const session = JSON.parse(
      new TextDecoder().decode(decrypted),
    ) as StoredAuthSession;

    if (
      session.version !== SESSION_VERSION ||
      !session.accessToken ||
      !session.user?.login ||
      !session.user?.avatarUrl ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }

    return { accessToken: session.accessToken, user: session.user };
  } catch {
    return null;
  }
}

export async function getAuthSessionFromRequest(
  request: NextRequest,
): Promise<AuthSession | null> {
  return decodeAuthSession(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}
