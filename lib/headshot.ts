import sharp from "sharp";

const SIZE = 256;
const JPEG_QUALITY = 80;

const ALLOWED_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function isAllowedMime(mime: string): mime is (typeof ALLOWED_MIMES)[number] {
  return (ALLOWED_MIMES as readonly string[]).includes(mime);
}

/**
 * Process an uploaded image: center-crop to 1:1, resize for A4 resume, compress as JPEG.
 * Returns a Buffer suitable for PostgreSQL bytea storage.
 */
export async function processHeadshot(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize(SIZE, SIZE, { fit: "cover", position: "center" })
    .jpeg({ quality: JPEG_QUALITY })
    .toBuffer();
}

export const MAX_HEADSHOT_BYTES = 2 * 1024 * 1024; // 2MB
