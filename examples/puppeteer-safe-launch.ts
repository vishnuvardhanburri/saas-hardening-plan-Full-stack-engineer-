import puppeteer from "puppeteer";

export async function launchSafeBrowser() {
  return puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-zygote",
      "--single-process"
    ],
    timeout: 30_000
  });
}

/Note: In production this would be paired with queue limits and process isolation./
