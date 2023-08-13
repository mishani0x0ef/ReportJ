import './preference.css';

import React from 'react';

type PreferenceProps = {
  name: string;
  description: string;
};

const Preference: React.FC<PreferenceProps> = ({ name, description }) => {
  return (
    <div className="reportj-preference">
      <label htmlFor={name} className="reportj-preference__label">
        {description}
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        className="reportj-preference__switch"
      />
    </div>
  );
};

export default Preference;
