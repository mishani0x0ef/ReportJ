import { createPortal, useState } from '@common/ui';
import { useTarget } from './hooks/use-target';
import { Popup } from '../.common/components/popup/popup';
import TimeSelector from './components/time-selector/time-selector';

export default function LogTime() {
  const { target, input } = useTarget();
  const [open, setOpen] = useState(false);

  function setLogTime(time: string) {
    if (input) {
      input.value = time;
    }
    setOpen(false);
  }

  if (!target) {
    return null;
  }

  return createPortal(
    <Popup
      open={open}
      trigger={
        <span onClick={() => setOpen((current) => !current)}>ReportJ</span>
      }
    >
      <TimeSelector onSave={setLogTime} />
    </Popup>,
    target
  );
}
