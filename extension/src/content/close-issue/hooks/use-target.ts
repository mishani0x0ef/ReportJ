import { useEffect, useState } from 'preact/hooks';
import { raise } from '../../.common/utils/raise';
import { observeDialog } from '../../.common/utils/observe-dialog';

type Target = HTMLElement | null;

export function useTarget(): Target {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  function createTarget(dialog: HTMLDivElement) {
    const root = document.createElement('reportj-root');
    const footer = dialog.querySelector('.form-footer .buttons');

    raise(footer, '[ReportJ] No footer for "CloseIssue" button');

    footer.prepend(root);
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
