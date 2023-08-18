import { PreferenceName } from '@common/types/preferences';
import { usePreference } from '@common/components/preferences/preferences-provider';

type When = 'enabled' | 'disabled';
type PreferenceTransform = (value: boolean) => boolean;
type WhenPreferenceProps = {
  name: PreferenceName;
  when?: When;
  children?: Children;
};

export default function WhenPreference({
  name,
  when = 'enabled',
  children,
}: WhenPreferenceProps) {
  const preference = usePreference(name);
  const visible: Record<When, PreferenceTransform> = {
    enabled: (value) => value,
    disabled: (value) => !value,
  };

  if (visible[when](preference)) {
    return <>{children}</>;
  }

  return null;
}
