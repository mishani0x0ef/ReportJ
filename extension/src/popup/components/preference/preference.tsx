import './preference.css';
import Switch from '../switch/switch';
import React, { useId } from 'react';
import { PreferenceName } from '@common/types/preferences';
import { usePreference } from './hooks/use-preference';

type PreferenceProps = {
  name: PreferenceName;
  title: string;
  description?: string;
};

const Preference: React.FC<PreferenceProps> = ({
  name,
  title,
  description,
}) => {
  const id = useId();
  const [enabled, setEnabled] = usePreference(name);

  return (
    <div className="preference">
      <label htmlFor={id} className="preference__label">
        <strong>{title}</strong>
        <small>{description}</small>
      </label>
      <Switch
        id={id}
        name={name}
        value={enabled}
        onChange={(value) => setEnabled(value)}
      />
    </div>
  );
};

export default Preference;
