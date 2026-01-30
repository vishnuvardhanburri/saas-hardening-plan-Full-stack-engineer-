import puppeteer, { Browser, Page } from 'puppeteer';

export class BrowserManager {
  private static instance: Browser | null = null;

  private static async getBrowser(): Promise<Browser> {
    if (!this.instance || !this.instance.isConnected()) {
      this.instance = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
    }
    return this.instance;
  }

  static async execute<T>(task: (page: Page) => Promise<T>): Promise<T> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    // Security Guardrail: SSRF Protection
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      const internalIpPattern = /^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.)/;
      if (internalIpPattern.test(url)) {
        return req.abort();
      }
      req.continue();
    });

    try {
      return await task(page);
    } finally {
      // Mandatory cleanup to prevent memory leaks (Zombie Pages)
      await page.close();
    }
  }
}
