import './preference.css';
import Switch from '../switch/switch';
import { useId } from '@common/ui';
import { PreferenceName } from '@common/types/preferences';
import { usePreference } from './hooks/use-preference';

type PreferenceProps = {
  name: PreferenceName;
  title: string;
  description?: string;
};

export default function Preference({
  name,
  title,
  description,
}: PreferenceProps) {
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
}
