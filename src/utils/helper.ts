export const formatTime = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds); // Remove decimals
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
