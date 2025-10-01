export type PlaybackDiagnosticsEntry = {
  timestamp: string;
  message: string;
  data?: Record<string, unknown>;
};

export type PlaybackDiagnosticsSummary = {
  attempts: number;
  success: boolean;
};

export type PlaybackFailureInfo = {
  label: string;
  context: string;
  startedAt: string;
  completedAt: string;
  attempts: number;
  success: boolean;
  metadata: {
    userAgent?: string;
    language?: string;
    platform?: string;
    href?: string;
  };
  entries: PlaybackDiagnosticsEntry[];
  text: string;
};

export type PlaybackDiagnostics = {
  label: string;
  context: string;
  record: (message: string, data?: Record<string, unknown>) => void;
  report: (summary: PlaybackDiagnosticsSummary) => PlaybackFailureInfo;
};

type CreatePlaybackDiagnosticsParams = {
  label: string;
  context: string;
};

const formatData = (data?: Record<string, unknown>) => {
  if (!data) return '';
  try {
    return JSON.stringify(data);
  } catch (error) {
    return '[Unserializable Data]';
  }
};

const formatEntry = (entry: PlaybackDiagnosticsEntry, index: number) => {
  const base = `${index + 1}. [${entry.timestamp}] ${entry.message}`;
  const serialized = formatData(entry.data);
  return serialized ? `${base} — ${serialized}` : base;
};

const collectMetadata = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    userAgent: window.navigator?.userAgent,
    language: window.navigator?.language,
    platform: window.navigator?.platform,
    href: window.location?.href,
  };
};

export const createPlaybackDiagnostics = ({
  label,
  context,
}: CreatePlaybackDiagnosticsParams): PlaybackDiagnostics => {
  const entries: PlaybackDiagnosticsEntry[] = [];
  const metadata = collectMetadata();
  const startedAt = new Date().toISOString();

  const record = (message: string, data?: Record<string, unknown>) => {
    entries.push({ timestamp: new Date().toISOString(), message, data });
  };

  const report = ({ attempts, success }: PlaybackDiagnosticsSummary): PlaybackFailureInfo => {
    const completedAt = new Date().toISOString();

    const lines = [
      `Context: ${context}`,
      `Label: ${label}`,
      `Success: ${success}`,
      `Attempts: ${attempts}`,
      `StartedAt: ${startedAt}`,
      `CompletedAt: ${completedAt}`,
      `UserAgent: ${metadata.userAgent ?? 'N/A'}`,
      `Language: ${metadata.language ?? 'N/A'}`,
      `Platform: ${metadata.platform ?? 'N/A'}`,
      `URL: ${metadata.href ?? 'N/A'}`,
      '',
      'Entries:',
      ...entries.map((entry, index) => formatEntry(entry, index)),
    ];

    return {
      label,
      context,
      startedAt,
      completedAt,
      attempts,
      success,
      metadata,
      entries: [...entries],
      text: lines.join('\n'),
    };
  };

  return {
    label,
    context,
    record,
    report,
  };
};
