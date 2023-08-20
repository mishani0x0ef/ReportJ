import { createPortal, useState } from '@common/ui';
import { useTarget } from './hooks/use-target';
import { Popup } from '../.common/components/popup/popup';

export default function LogTime() {
  const target = useTarget();
  // TODO: move to hook
  const [open, setOpen] = useState(false);

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
      <>Content</>
    </Popup>,
    target
  );
}
