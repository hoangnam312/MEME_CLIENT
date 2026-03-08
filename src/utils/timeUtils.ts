/**
 * Formats a duration given in seconds into a MM:SS string.
 * e.g. 65 → "01:05"
 */
export const formatSeconds = (totalSeconds: number): string => {
	const mins = Math.floor(totalSeconds / 60);
	const secs = Math.floor(totalSeconds % 60);
	return `${mins.toString().padStart(2, '0')}:${secs
		.toString()
		.padStart(2, '0')}`;
};
