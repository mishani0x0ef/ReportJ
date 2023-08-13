import React from 'react';

type PreferenceProps = {
  name: string;
  description: string;
};

const Preference: React.FC<PreferenceProps> = ({ name, description }) => {
  return (
    <div>
      <label htmlFor={name}>{description}</label>
      <input type="checkbox" id={name} name={name} />
    </div>
  );
};

export default Preference;
