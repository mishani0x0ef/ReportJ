export function success(response: Response): boolean {
  return response.status >= 200 && response.status < 300;
}

export function ensureSuccess(response: Response, message?: string): void {
  if (!success(response)) {
    throw new Error(message || `[ReportJ] Response status: ${response.status}`);
  }
}
