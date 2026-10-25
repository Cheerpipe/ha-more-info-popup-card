import { describe, expect, it } from "vitest";
import { adjustForTheme, dominantColor, type Rgb } from "../src/ha/art-color";
import { formatMediaTime, mediaPosition } from "../src/controls/media-time";

const pixels = (...colors: [Rgb, number][]) =>
  colors.flatMap(([rgb, count]) =>
    Array.from({ length: count }, () => [...rgb, 255]).flat(),
  );

const lightness = ([r, g, b]: Rgb) =>
  (Math.max(r, g, b) + Math.min(r, g, b)) / 510;

describe("dominantColor", () => {
  it("picks the most common color", () => {
    expect(
      dominantColor(pixels([[40, 120, 200], 60], [[200, 60, 40], 20])),
    ).toEqual([40, 120, 200]);
  });

  it("skips near-black and near-white backgrounds", () => {
    expect(
      dominantColor(
        pixels([[5, 5, 5], 300], [[250, 250, 250], 300], [[30, 160, 140], 10]),
      ),
    ).toEqual([30, 160, 140]);
  });

  it("favors saturated colors over grey of similar size", () => {
    expect(
      dominantColor(pixels([[120, 120, 120], 40], [[220, 120, 20], 35])),
    ).toEqual([220, 120, 20]);
  });

  it("ignores transparent pixels and gives up on dull images", () => {
    expect(dominantColor([200, 40, 40, 0])).toBeUndefined();
    expect(dominantColor(pixels([[0, 0, 0], 50]))).toBeUndefined();
  });
});

describe("adjustForTheme", () => {
  it("keeps colors that already stand out", () => {
    expect(adjustForTheme([40, 120, 200], false)).toEqual([40, 120, 200]);
  });

  it("lightens dark colors on a dark theme and darkens light ones", () => {
    expect(
      lightness(adjustForTheme([20, 40, 90], true)),
    ).toBeGreaterThanOrEqual(0.49);
    expect(
      lightness(adjustForTheme([200, 230, 250], false)),
    ).toBeLessThanOrEqual(0.61);
  });
});

describe("adjustForTheme keeps the hue", () => {
  it("round-trips colors already in range", () => {
    expect(adjustForTheme([60, 140, 210], false)).toEqual([60, 140, 210]);
  });

  it("darkens a pastel blue to a vivid blue, not a grey", () => {
    const [r, g, b] = adjustForTheme([177, 212, 240], false);
    expect(b).toBeGreaterThan(r + 60);
    expect(b).toBeGreaterThan(g);
  });
});

describe("seek position", () => {
  const attrs = {
    media_position: 100,
    media_position_updated_at: "2026-10-25T12:00:00.000Z",
  };
  const now = new Date("2026-10-25T12:00:30.000Z").getTime();

  it("advances while playing", () => {
    expect(mediaPosition(attrs, true, now)).toBe(130);
  });

  it("stays put while paused", () => {
    expect(mediaPosition(attrs, false, now)).toBe(100);
  });

  it("formats like the native media player", () => {
    expect(formatMediaTime(4169, true)).toBe("01:09:29");
    expect(formatMediaTime(65, false)).toBe("1:05");
    expect(formatMediaTime(-3, false)).toBe("0:00");
  });
});
