/**
 * Dominant color of a media artwork, for controls that follow the cover
 * (`seek_color: art`). The image is shrunk to a few pixels and its colors
 * grouped; the most common one wins, favoring saturated colors and skipping
 * near-black and near-white, which would give a grey control on most posters.
 */

export type Rgb = [number, number, number];

/** Side of the shrunk image (px). */
const SAMPLE_SIZE = 24;

const lightness = ([r, g, b]: Rgb) =>
  (Math.max(r, g, b) + Math.min(r, g, b)) / 510;

/** How colorful a pixel is: pastels and greys score low, vivid colors high. */
const chroma = ([r, g, b]: Rgb) =>
  (Math.max(r, g, b) - Math.min(r, g, b)) / 255;

/** Most representative color of RGBA pixels, or undefined if all are dull. */
export const dominantColor = (pixels: ArrayLike<number>): Rgb | undefined => {
  const buckets = new Map<
    number,
    { count: number; r: number; g: number; b: number; s: number }
  >();
  for (let i = 0; i + 3 < pixels.length; i += 4) {
    if (pixels[i + 3]! < 128) continue;
    const rgb: Rgb = [pixels[i]!, pixels[i + 1]!, pixels[i + 2]!];
    const l = lightness(rgb);
    if (l < 0.12 || l > 0.9) continue;
    // 8 levels per channel: close colors land in the same bucket.
    const key = ((rgb[0] >> 5) << 6) | ((rgb[1] >> 5) << 3) | (rgb[2] >> 5);
    const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0, s: 0 };
    bucket.count += 1;
    bucket.r += rgb[0];
    bucket.g += rgb[1];
    bucket.b += rgb[2];
    bucket.s += chroma(rgb);
    buckets.set(key, bucket);
  }
  let best: Rgb | undefined;
  let bestScore = 0;
  for (const bucket of buckets.values()) {
    const score = bucket.count * (0.15 + bucket.s / bucket.count);
    if (score > bestScore) {
      bestScore = score;
      best = [
        Math.round(bucket.r / bucket.count),
        Math.round(bucket.g / bucket.count),
        Math.round(bucket.b / bucket.count),
      ];
    }
  }
  return best;
};

/**
 * Same hue and saturation, lightness kept where a thin slider still stands
 * out: not too dark on a dark theme, not too light on a light one.
 */
export const adjustForTheme = (rgb: Rgb, darkMode: boolean): Rgb => {
  const [h, sat, l] = toHsl(rgb);
  const [min, max] = darkMode ? [0.5, 0.75] : [0.3, 0.55];
  if (l >= min && l <= max) return rgb;
  return fromHsl([h, sat, Math.min(max, Math.max(min, l))]);
};

const toHsl = ([r, g, b]: Rgb): [number, number, number] => {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const sat = d / (1 - Math.abs(2 * l - 1));
  const h =
    max === rn
      ? ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
      : max === gn
        ? ((bn - rn) / d + 2) / 6
        : ((rn - gn) / d + 4) / 6;
  return [h, sat, l];
};

const fromHsl = ([h, sat, l]: [number, number, number]): Rgb => {
  const c = (1 - Math.abs(2 * l - 1)) * sat;
  const channel = (n: number) => {
    const k = (n + h * 12) % 12;
    return Math.round(
      (l - (c / 2) * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255,
    );
  };
  return [channel(0), channel(8), channel(4)];
};

export const rgbCss = ([r, g, b]: Rgb) => `rgb(${r}, ${g}, ${b})`;

const cache = new Map<string, Promise<Rgb | undefined>>();

/** Dominant color of the image at `url` (cached per url). */
export const artColor = (url: string): Promise<Rgb | undefined> => {
  let result = cache.get(url);
  if (!result) {
    result = new Promise<Rgb | undefined>((resolve) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = SAMPLE_SIZE;
          canvas.height = SAMPLE_SIZE;
          const context = canvas.getContext("2d", { willReadFrequently: true });
          if (!context) return resolve(undefined);
          context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
          resolve(
            dominantColor(
              context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data,
            ),
          );
        } catch {
          // Image from another origin without CORS: its pixels can't be read.
          resolve(undefined);
        }
      };
      image.onerror = () => resolve(undefined);
      image.src = url;
    });
    // Keep the cache small: covers change with every title.
    if (cache.size > 20) cache.delete(cache.keys().next().value!);
    cache.set(url, result);
  }
  return result;
};
