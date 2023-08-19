import { useEffect, useState } from '@common/ui';
import { raise } from '../../.common/utils/raise';
import { observeDialog } from '../../.common/utils/observe-dialog';
import { insertAfter } from '../../.common/utils/insert-after';

type Target = Nullable<HTMLElement>;

export function useTarget(): Target {
  const [target, setTarget] = useState<Target>(null);

  function createTarget(dialog: HTMLDivElement) {
    const root = document.createElement('reportj-root');
    const timeInput = dialog.querySelector('#log-work-time-logged');

    raise(timeInput, '[ReportJ] No time input for "LogTime" feature');

    insertAfter(root, timeInput);
    setTarget(root);
  }

  function removeTarget() {
    setTarget(null);
  }

  useEffect(() => {
    const dialog = observeDialog('Log work');

    dialog.onShow(createTarget);
    dialog.onHide(removeTarget);

    return function cleanup() {
      dialog.dispose();
    };
  }, []);

  return target;
}
