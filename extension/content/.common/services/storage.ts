import { Preferences } from '../types/preferences';

export async function getPreferences(): Promise<Preferences> {
  // TODO: read from storage
  return {
    addIssueSummary: true,
    closeIssue: true,
  };
}
