import './time-selector.css';

import CheckboxGroup from '../../../.common/components/checkbox-group/checkbox-group';
import Button from '../../../.common/components/button/button';
import { useState } from 'preact/hooks';

type LogTimeString = `${number}h ${number}m`;
type LogTime = {
  hours: number;
  minutes: number;
};

type TimeSelectorProps = {
  onSave?: (logTime: LogTimeString) => void;
};

export default function TimeSelector({ onSave }: TimeSelectorProps) {
  const [time, setTime] = useState<LogTime>({ hours: 0, minutes: 0 });
  const hours = new Array(9).fill(null).map((_, index) => index);
  const minutes = [0, 15, 30, 45];

  function setHour(hours: number) {
    setTime((time) => ({ ...time, hours }));
  }

  function setMinutes(minutes: number) {
    setTime((time) => ({ ...time, minutes }));
  }

  function saveChanges() {
    onSave(`${time.hours}h ${time.minutes}m`);
  }

  return (
    <section class="reportj-time-selector">
      <CheckboxGroup name="reportj-log-time-hours" onChange={setHour}>
        {hours.map((_, index) => (
          <CheckboxGroup.Checkbox
            key={index}
            value={index}
            text={`${index}h`}
          />
        ))}
      </CheckboxGroup>

      <CheckboxGroup name="reportj-log-time-minutes" onChange={setMinutes}>
        {minutes.map((minutes) => (
          <CheckboxGroup.Checkbox
            key={minutes}
            value={minutes}
            text={`${minutes}m`}
          />
        ))}
      </CheckboxGroup>

      <div class="reportj-time-selector__footer">
        <small>Powered by ReportJ</small>
        <Button
          onClick={(e) => {
            e.preventDefault();
            saveChanges();
          }}
        >
          Save
        </Button>
      </div>
    </section>
  );
}
