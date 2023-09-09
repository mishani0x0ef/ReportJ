import '../src/content/index.css';
import { render } from '@common/ui';
import TimeSelector from '../src/content/log-time/components/time-selector/time-selector';

type StoryProps = {
  name: string;
  children: Children;
};

function Story({ name, children }: StoryProps) {
  return (
    <section
      style={{
        fontFamily:
          '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
        width: 500,
        border: '1px solid black',
        padding: '16px',
        borderRadius: '6px',
      }}
    >
      <h1>{name}</h1>
      {children}
    </section>
  );
}

function TimeSelectorStory() {
  return (
    <Story name="Time Selector">
      <TimeSelector />
    </Story>
  );
}

const root = document.getElementById('root');

render(
  <main style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
    <TimeSelectorStory />
  </main>,
  root
);
