import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { Preferences } from '@common/types/preferences';
import { useQuery } from '@common/hooks/use-query';
import { getPreferences } from '@common/storage/preferences';

const PreferencesContext = createContext<Nullable<Preferences>>(null);

type PreferencesProviderProps = {
  children?: Children;
};

export default function PreferencesProvider({
  children,
}: PreferencesProviderProps) {
  const [preferences, isLoading] = useQuery(getPreferences);

  if (isLoading) {
    return null;
  }

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreference(name: keyof Preferences) {
  const preferences = useContext(PreferencesContext);

  return preferences?.[name];
}
