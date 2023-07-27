export function raise(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(message || '[ReportJ] Value is not properly defined');
  }
}
