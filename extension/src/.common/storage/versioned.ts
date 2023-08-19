import {
  StorageKey,
  StorageVersions,
  VersionedStorageKey,
} from '../types/storage';

const currentVersion: StorageVersions = 'v3';

export function versioned(
  key: StorageKey,
  version = currentVersion
): VersionedStorageKey {
  return `${version}.${key}`;
}
