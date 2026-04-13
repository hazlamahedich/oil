import { statSync, readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const HARD_FAIL_BYTES = 1_500_000;
const ARTIFACT_PATH = resolve(import.meta.dirname, '..', 'dist', 'index.html');

function getGzippedSize(filePath: string): number {
  const content = readFileSync(filePath);
  const compressed = gzipSync(content);
  return compressed.length;
}

function formatBytes(bytes: number): string {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function main(): void {
  let stats: { size: number };
  try {
    stats = statSync(ARTIFACT_PATH);
  } catch {
    console.error(`ERROR: Bundle artifact not found at ${ARTIFACT_PATH}`);
    console.error('Run "npm run build" first.');
    process.exit(1);
  }

  const uncompressedSize = stats.size;
  const gzippedSize = getGzippedSize(ARTIFACT_PATH);

  console.log('=== Bundle Size Report ===');
  console.log(`Artifact:     dist/index.html`);
  console.log(`Uncompressed: ${formatBytes(uncompressedSize)}`);
  console.log(`Gzipped:      ${formatBytes(gzippedSize)}`);
  console.log(`Threshold:    ${formatBytes(HARD_FAIL_BYTES)} (uncompressed)`);
  console.log('');

  if (uncompressedSize > HARD_FAIL_BYTES) {
    console.error(
      `FAIL: Bundle size ${formatBytes(uncompressedSize)} exceeds threshold ${formatBytes(HARD_FAIL_BYTES)}`
    );
    process.exit(1);
  }

  console.log(`PASS: Bundle size ${formatBytes(uncompressedSize)} is within threshold.`);
  process.exit(0);
}

main();
