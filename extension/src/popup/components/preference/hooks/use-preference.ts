import { usePreference as usePreferenceInitialValue } from '@common/components/preferences/preferences-provider';
import { setPreferences } from '@common/storage/preferences';
import { PreferenceName } from '@common/types/preferences';
import { useState } from 'preact/hooks';

export function usePreference(
  name: PreferenceName
): [boolean, (value: boolean) => void] {
  const [enabled, setEnabled] = useState(usePreferenceInitialValue(name));

  function setValue(enabled: boolean) {
    setEnabled(enabled);
    setPreferences({
      [name]: enabled,
    });
  }

  return [enabled, setValue];
}
