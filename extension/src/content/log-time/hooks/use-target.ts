import { useEffect, useState } from '@common/ui';
import { raise } from '../../.common/utils/raise';
import { observeDialog } from '../../.common/utils/observe-dialog';
import { insertAfter } from '../../.common/utils/insert-after';

type Target = Nullable<HTMLElement>;
type Input = Nullable<HTMLInputElement>;

type Targets = {
  target: Target;
  input: Input;
};

export function useTarget(): Targets {
  const [target, setTarget] = useState<Target>(null);
  const [input, setInput] = useState<Input>(null);

  function createTarget(dialog: HTMLDivElement) {
    const root = document.createElement('reportj-root');
    const timeInput = dialog.querySelector<HTMLInputElement>(
      '#log-work-time-logged'
    );

    raise(timeInput, '[ReportJ] No time input for "LogTime" feature');

    insertAfter(root, timeInput);
    setTarget(root);
    setInput(timeInput);
  }

  function removeTarget() {
    setTarget(null);
    setInput(null);
  }

  useEffect(() => {
    const dialog = observeDialog('Log work');

    dialog.onShow(createTarget);
    dialog.onHide(removeTarget);

    return function cleanup() {
      dialog.dispose();
    };
  }, []);

  return { target, input };
}
