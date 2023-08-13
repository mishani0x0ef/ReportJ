import Switch from '../switch/switch';
import './preference.css';

import React, { useId } from 'react';

type PreferenceProps = {
  name: string;
  description: string;
};

const Preference: React.FC<PreferenceProps> = ({ name, description }) => {
  const id = useId();

  return (
    <div className="reportj-preference">
      <label htmlFor={id} className="reportj-preference__label">
        {description}
      </label>
      <Switch id={id} name={name} />
    </div>
  );
};

export default Preference;
