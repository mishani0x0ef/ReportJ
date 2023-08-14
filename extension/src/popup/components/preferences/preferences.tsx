import './preferences.css';

import React from 'react';

type PreferenceProps = {
  children?: React.ReactNode;
};

const Preferences: React.FC<PreferenceProps> = ({ children }) => (
  <div className="preferences">{children}</div>
);

export default Preferences;
