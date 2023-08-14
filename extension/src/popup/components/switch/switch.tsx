import './switch.css';

import React from 'react';

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
      checked={value}
      onChange={(e) => onChange?.(e.target.checked)}
    />
    <span className="switch__slider"></span>
  </label>
);

export default Switch;
