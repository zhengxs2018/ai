import { randomUUID } from 'node:crypto';
import { createReadStream, createWriteStream, mkdirSync } from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';

export const dataDir = path.join(__dirname, 'data');

export function getTestFile(filename: string) {
  return createReadStream(path.join(dataDir, filename));
}

export const cacheDir = path.join(__dirname, '..', '.cache');

mkdirSync(cacheDir, { recursive: true });

export function saveFile(binary?: globalThis.ReadableStream | ReadableStream | null, name?: string) {
  if (!binary) return;

  const filename = path.resolve(cacheDir, name || `${randomUUID()}.png`);

  Readable.fromWeb(binary as ReadableStream).pipe(createWriteStream(filename));
}

export async function downloadImage(url: string, name?: string) {
  const data = await fetch(url).then(response => response.body);
  saveFile(data, name);
}
