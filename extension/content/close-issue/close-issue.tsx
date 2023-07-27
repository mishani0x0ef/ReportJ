import { observeDialog } from '../.common/utils/observe-dialog';

export function closeIssue() {
  const { onShow, onHide } = observeDialog('Log work');

  onShow((dialog) => {
    console.log('[ReportJ] Close Issue dialog appeared', dialog);
  });

  onHide((dialog) => {
    console.log('[ReportJ] Close Issue dialog disappeared', dialog);
  });
}
