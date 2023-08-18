import './preferences.css';

type PreferenceProps = {
  children?: Children;
};

export default function Preferences({ children }: PreferenceProps) {
  return <main className="preferences">{children}</main>;
}
