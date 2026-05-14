'use client';

import {
  CONTRIBUTION_PERIOD_OPTIONS,
  type ContributionPeriod,
} from '@/lib/contribution-period';

interface TimePeriodSelectorProps {
  period: ContributionPeriod;
  customFrom: string;
  customTo: string;
  loading: boolean;
  error: string | null;
  showGitlabLimitNote: boolean;
  onPeriodChange: (period: ContributionPeriod) => void;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
  onApplyCustomRange: () => void;
}

export function TimePeriodSelector({
  period,
  customFrom,
  customTo,
  loading,
  error,
  showGitlabLimitNote,
  onPeriodChange,
  onCustomFromChange,
  onCustomToChange,
  onApplyCustomRange,
}: TimePeriodSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto mt-4">
      <label
        htmlFor="time-period"
        className="block text-xs font-medium mb-1.5"
        style={{ color: 'var(--text-secondary)' }}
      >
        Time period
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          id="time-period"
          value={period}
          onChange={(event) =>
            onPeriodChange(event.target.value as ContributionPeriod)
          }
          className="px-3 py-2 rounded-lg text-sm outline-none transition-colors cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          {CONTRIBUTION_PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {period === 'custom' && (
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <input
              type="date"
              value={customFrom}
              onChange={(event) => onCustomFromChange(event.target.value)}
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-colors"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              aria-label="From date"
            />
            <input
              type="date"
              value={customTo}
              onChange={(event) => onCustomToChange(event.target.value)}
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-colors"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              aria-label="To date"
            />
            <button
              type="button"
              onClick={onApplyCustomRange}
              disabled={loading || !customFrom || !customTo}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg)',
              }}
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs" style={{ color: '#f85149' }}>
          {error}
        </p>
      )}

      {showGitlabLimitNote && (
        <p className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          GitLab only exposes roughly the last 12 months from its calendar
          endpoint, so older custom or last-year ranges may be truncated there.
        </p>
      )}
    </div>
  );
}
