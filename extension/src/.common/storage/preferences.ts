import { Preferences } from '../types/preferences';
import { StorageKey, VersionedStorageKey } from '../types/settings';

function versioned(key: StorageKey): VersionedStorageKey {
  return `v3.${key}`;
}

type PreferencesResponse = {
  preferences: Maybe<Preferences>;
};

export async function getPreferences(): Promise<Preferences> {
  const defaultPreferences: Preferences = {
    addIssueSummary: true,
    closeIssue: true,
  };

  const { preferences } = (await chrome.storage.sync.get([
    versioned('preferences'),
  ])) as PreferencesResponse;

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
