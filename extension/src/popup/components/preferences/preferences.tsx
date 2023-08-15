import './preferences.css';

import React from 'react';

type PreferenceProps = {
  children?: React.ReactNode;
};

const Preferences: React.FC<PreferenceProps> = ({ children }) => (
  <main className="preferences">{children}</main>
);

export default Preferences;
