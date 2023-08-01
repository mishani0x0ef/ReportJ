import React, { createContext, useContext } from 'react';
import { Preferences } from '../../types/preferences';
import { useQuery } from '../../hooks/use-query';
import { getPreferences } from '../../services/preferences-storage';

const PreferencesContext = createContext<Nullable<Preferences>>(null);

export const usePreference = (name: keyof Preferences) => {
  const preferences = useContext(PreferencesContext);

  return preferences?.[name];
};

type PreferencesProviderProps = {
  children?: React.ReactNode;
};

const PreferencesProvider: React.FC<PreferencesProviderProps> = ({
  children,
}) => {
  const [preferences, isLoading] = useQuery(getPreferences);

  if (isLoading) {
    return null;
  }

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
