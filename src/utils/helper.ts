export const formatTime = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds); // Remove decimals
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const calculateLatencyMs = (
  startSeconds: number,
  endSeconds: number
) => {
  const durationSeconds = endSeconds - startSeconds;
  const durationMs = durationSeconds * 1000;

  return {
    milliseconds: durationMs,
    seconds: durationSeconds,
    formatted: `Latency: ${durationMs} ms`,
  };
};
