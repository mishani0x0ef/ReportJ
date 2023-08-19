import { Preferences } from '../types/preferences';
import { versioned } from './versioned';

type PreferencesResponse = {
  preferences: Maybe<Preferences>;
};

export async function getPreferences(): Promise<Preferences> {
  const defaultPreferences: Preferences = {
    addIssueSummary: true,
    closeIssue: true,
  };

  const result = (await chrome.storage.sync.get([
    versioned('preferences'),
  ])) as PreferencesResponse;

  const preferences = result[versioned('preferences')];

  return { ...defaultPreferences, ...preferences };
}

export async function setPreferences(
  preferences: Partial<Preferences>
): Promise<void> {
  const currentPreferences = await getPreferences();
  const targetPreferences = { ...currentPreferences, ...preferences };

  await chrome.storage.sync.set({
    [versioned('preferences')]: targetPreferences,
  });
}
