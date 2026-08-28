const END_FRAME_GUARD_SECONDS = 0.05;
export const VIDEO_SEEK_TOLERANCE_SECONDS = 1 / 24;

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function getScrollVideoTime(progress: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return clampProgress(progress) * Math.max(duration - END_FRAME_GUARD_SECONDS, 0);
}

export function shouldSeekVideo(currentTime: number, targetTime: number, isSeeking: boolean) {
  return !isSeeking
    && Number.isFinite(currentTime)
    && Number.isFinite(targetTime)
    && Math.abs(currentTime - targetTime) >= VIDEO_SEEK_TOLERANCE_SECONDS;
}
