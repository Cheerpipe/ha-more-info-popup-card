/** Playback position and times of a media player, as the native control shows them. */

/** Position of a playing media now (`getCurrentProgress`, `src/data/media-player.ts`). */
export const mediaPosition = (
  attrs: Record<string, unknown>,
  playing: boolean,
  now: number,
): number => {
  const position = Number(attrs.media_position ?? 0);
  const updated = attrs.media_position_updated_at as string | undefined;
  if (!playing || !updated) return position;
  return position + (now - new Date(updated).getTime()) / 1000;
};

/** `1:05` / `01:09:29`, like the native media player times. */
export const formatMediaTime = (seconds: number, long: boolean): string => {
  const total = Math.max(0, Math.floor(seconds));
  const pad = (n: number) => String(n).padStart(2, "0");
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  return long ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
};
