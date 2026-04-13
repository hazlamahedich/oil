import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTIFACT_PATH = path.resolve(__dirname, '..', 'dist', 'index.html');

test.describe('Network isolation — zero outbound requests', () => {
  test.beforeEach(() => {
    test.skip(!existsSync(ARTIFACT_PATH), `Build artifact not found at ${ARTIFACT_PATH}. Run "npm run build" first.`);
  });

  test('built artifact makes no outgoing network requests', async ({ page }) => {
    await page.route('**/*', async (route) => {
      const url = route.request().url();
      const isLocal =
        url.startsWith('file://') ||
        url.startsWith('data:') ||
        url.includes('localhost') ||
        url.includes('127.0.0.1');

      if (!isLocal) {
        await route.abort();
      } else {
        await route.continue();
      }
    });

    const outgoingRequests: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      const isLocal =
        url.startsWith('file://') ||
        url.startsWith('data:') ||
        url.includes('localhost') ||
        url.includes('127.0.0.1');

      if (!isLocal) {
        outgoingRequests.push(url);
      }
    });

    await page.goto(`file://${ARTIFACT_PATH}`);

    await page.waitForSelector('#root', { timeout: 10000 });

    await page.waitForTimeout(2000);

    expect(outgoingRequests).toEqual([]);
  });

  test('page renders without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(`file://${ARTIFACT_PATH}`);

    await page.waitForSelector('#root', { timeout: 10000 });

    await page.waitForTimeout(2000);

    expect(consoleErrors).toEqual([]);
  });
});
