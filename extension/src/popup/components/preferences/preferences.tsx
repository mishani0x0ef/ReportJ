import React from 'react';

type PreferenceProps = {
  children?: React.ReactNode;
};

const Preferences: React.FC<PreferenceProps> = ({ children }) => (
  <div>{children}</div>
);

export default Preferences;
