import { ImageResponse } from 'next/og';

export const alt = 'GitAll — View GitHub & GitLab Contributions in One Place';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#0d1117',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        gap: '0px',
      }}
    >
      {/* 3×3 contribution grid mark */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '32px',
        }}
      >
        {[
          ['#39d353', '#fd9a28', '#2dd4bf'],
          ['#fd9a28', '#5eead4', '#39d353'],
          ['#2dd4bf', '#39d353', '#fd9a28'],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '10px' }}>
            {row.map((color, ci) => (
              <div
                key={ci}
                style={{
                  width: 48,
                  height: 48,
                  background: color,
                  borderRadius: 8,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Wordmark */}
      <div
        style={{
          display: 'flex',
          fontSize: 80,
          fontWeight: 700,
          letterSpacing: '-3px',
          lineHeight: 1,
        }}
      >
        <span style={{ color: '#f0f6fc' }}>Git</span>
        <span style={{ color: '#2dd4bf' }}>All</span>
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 28,
          color: '#8b949e',
          marginTop: 20,
          textAlign: 'center',
          maxWidth: 800,
          lineHeight: 1.4,
        }}
      >
        View GitHub &amp; GitLab contributions in one unified heatmap
      </div>

      {/* URL badge */}
      <div
        style={{
          marginTop: 32,
          fontSize: 22,
          color: '#2dd4bf',
          background: '#161b22',
          padding: '8px 20px',
          borderRadius: 8,
          border: '1px solid #30363d',
        }}
      >
        gitall.app
      </div>
    </div>,
    { ...size },
  );
}
