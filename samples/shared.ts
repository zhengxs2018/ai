import { randomUUID } from 'node:crypto';
import { createReadStream, createWriteStream, mkdirSync } from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';

export const mediaDir = path.join(__dirname, '..', 'media');

export function getMediaFile(filename: string) {
  return createReadStream(path.join(mediaDir, filename));
}

export const cacheDir = path.join(__dirname, '..', '.cache');

mkdirSync(cacheDir, { recursive: true });

export function saveFile(binary: ReadableStream, name?: string) {
  const filename = path.resolve(cacheDir, name || `${randomUUID()}.png`);

  Readable.fromWeb(binary).pipe(createWriteStream(filename));
}
