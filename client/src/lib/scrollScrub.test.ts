import { describe, expect, it } from "vitest";
import { getScrollVideoTime, shouldSeekVideo, VIDEO_SEEK_TOLERANCE_SECONDS } from "./scrollScrub";

describe("scroll-scrub timeline", () => {
  it("maps the full scroll range to the video while preserving the final frame", () => {
    expect(getScrollVideoTime(0, 10)).toBe(0);
    expect(getScrollVideoTime(1, 10)).toBeCloseTo(9.95);
    expect(getScrollVideoTime(1.5, 10)).toBeCloseTo(9.95);
  });

  it("seeks when a user reverses direction", () => {
    expect(shouldSeekVideo(8.2, 2.1, false)).toBe(true);
  });

  it("coalesces tiny changes and waits for an in-flight seek", () => {
    expect(shouldSeekVideo(3, 3 + VIDEO_SEEK_TOLERANCE_SECONDS / 2, false)).toBe(false);
    expect(shouldSeekVideo(3, 8, true)).toBe(false);
  });
});
