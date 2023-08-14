import { PreferenceName } from '@common/types/preferences';
import { usePreference } from '@common/components/preferences/preferences-provider';

type When = 'enabled' | 'disabled';
type PreferenceTransform = (value: boolean) => boolean;
type WhenPreferenceProps = {
  name: PreferenceName;
  when?: When;
  children?: React.ReactNode;
};

const WhenPreference: React.FC<WhenPreferenceProps> = ({
  name,
  when = 'enabled',
  children,
}) => {
  const preference = usePreference(name);
  const visible: Record<When, PreferenceTransform> = {
    enabled: (value) => value,
    disabled: (value) => !value,
  };

  if (visible[when](preference)) {
    return children;
  }

  return null;
};

export default WhenPreference;
