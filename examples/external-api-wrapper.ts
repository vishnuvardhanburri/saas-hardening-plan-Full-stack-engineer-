export async function guardedApiCall<T>(
  fn: () => Promise<T>,
  options = { timeoutMs: 10_000 }
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs);

  try {
    return await fn();
  } catch (err) {
    throw new Error("External API failure");
  } finally {
    clearTimeout(timeout);
  }
}
