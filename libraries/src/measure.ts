// src/measure.ts

export type MeasureResult<T> = {
  label: string;
  durationMs: number;
  data: T;
};

export class MeasureError extends Error {
  constructor(
    public readonly label: string,
    public readonly durationMs: number,
    public readonly originalError: unknown,
  ) {
    super(`Measurement "${label}" failed after ${durationMs.toFixed(2)}ms`);
    this.name = "MeasureError";
  }
}

/**
 * Measures the execution time of an async operation.
 *
 * @param label - Human-readable operation name.
 * @param fn - Async function to measure.
 *
 * @returns The operation result and its duration.
 */
export async function measure<T>(
  label: string,
  fn: () => Promise<T>,
): Promise<MeasureResult<T>> {
  const start = performance.now();

  try {
    const data = await fn();

    const durationMs = performance.now() - start;

    console.log(`[yampe-observability] ${label}: ${durationMs.toFixed(2)}ms`);

    return {
      label,
      durationMs,
      data,
    };
  } catch (error) {
    const durationMs = performance.now() - start;

    console.error(
      `[yampe-observability] ${label}: failed after ${durationMs.toFixed(2)}ms`,
    );

    throw new MeasureError(label, durationMs, error);
  }
}
