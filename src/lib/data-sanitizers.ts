
/**
 * Ensures a value is a string.
 * @param value The value to check.
 * @param fallback Optional fallback value.
 * @returns The string value or the fallback (default: "").
 */
export function ensureString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return fallback;
}

/**
 * Ensures a value is an array of strings.
 * @param value The value to check.
 * @returns An array of strings.
 */
export function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return (value as unknown[])
      .map((item) => ensureString(item))
      .filter((item): item is string => item.length > 0);
  }
  return [];
}
