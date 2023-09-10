import { createPortal, useState } from '@common/ui';
import { useTarget } from './hooks/use-target';
import { Popup } from '../.common/components/popup/popup';
import TimeSelector from './components/time-selector/time-selector';
import { TriggerButton } from './components/trigger-button/trigger-button';

export default function LogTime() {
  const { target, input } = useTarget();
  const [open, setOpen] = useState(false);
  const openPopup = () => setOpen(true);

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
      setOpen={setOpen}
      trigger={<TriggerButton onClick={openPopup} />}
    >
      <TimeSelector onSave={setLogTime} />
    </Popup>,
    target
  );
}
