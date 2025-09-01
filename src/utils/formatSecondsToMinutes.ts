export const formatSecondsToMinutes = (totalSeconds: number) => {
  const isNegative = totalSeconds < 0;
  const absoluteSeconds = Math.abs(totalSeconds);

  const minutes = String(Math.floor(absoluteSeconds / 60)).padStart(2, '0');
  const seconds = String(absoluteSeconds % 60).padStart(2, '0');

  return `${isNegative ? '-' : ''}${minutes}:${seconds}`;
};
