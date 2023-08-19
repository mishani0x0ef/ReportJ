import { createPortal } from '@common/ui';
import Button from '../.common/components/button/button';
import { useTarget } from './hooks/use-target';
import { useCloseIssueCommand } from './hooks/use-close-command';

export default function CloseIssue() {
  const featureTarget = useTarget();
  const { isLoading, execute } = useCloseIssueCommand();

  if (!featureTarget) {
    return null;
  }

  return createPortal(
    <Button
      disabled={isLoading}
      title="Close issue and reset remaining estimate"
      type="submit"
      onClick={execute}
    >
      Close with ReportJ
    </Button>,
    featureTarget
  );
}
