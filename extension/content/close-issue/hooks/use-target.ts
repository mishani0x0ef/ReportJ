import { useEffect, useState } from 'react';
import { raise } from '../../.common/utils/raise';
import { observeDialog } from '../../.common/utils/observe-dialog';

type Target = HTMLElement | null;

export function useTarget(): Target {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  function createTarget() {
    const root = document.createElement('reportj-root');
    const footer = document.querySelector('.jira-dialog .form-footer .buttons');

    raise(
      footer,
      '[ReportJ] Cannot use "CloseIssue" feature, because root element not found'
    );

    footer.prepend(root);
    setTarget(root);
  }

  function removeTarget() {
    setTarget(null);
  }

  useEffect(() => {
    const dialog = observeDialog('Log work');

    dialog.onShow(() => createTarget());
    dialog.onHide(() => removeTarget());

    return function cleanup() {
      dialog.dispose();
    };
  }, []);

  return target;
}
