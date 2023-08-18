import './switch.css';

type SwitchProps = {
  id?: string;
  name?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
};

export default function Switch({
  id,
  name,
  value = false,
  onChange,
}: SwitchProps) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={value}
        onInput={(e) => onChange?.(e.currentTarget.checked)}
      />
      <span className="switch__slider"></span>
    </label>
  );
}
