import './switch.css';

import React from 'react';

function isOn(value: string) {
  return value === 'on';
}

function toSwitch(value: boolean) {
  return value ? 'on' : 'off';
}

type SwitchProps = {
  id?: string;
  name?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({
  id,
  name,
  value = false,
  onChange,
}) => (
  <label className="switch">
    <input
      type="checkbox"
      id={id}
      name={name}
      value={toSwitch(value)}
      onChange={(e) => onChange?.(isOn(e.target.value))}
    />
    <span className="switch__slider"></span>
  </label>
);

export default Switch;
