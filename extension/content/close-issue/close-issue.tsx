import React from 'react';
import { createPortal } from 'react-dom';
import Button from '../.common/components/button/button';
import { useTarget } from './hooks/use-target';
import { useCloseIssueCommand } from './hooks/use-close-command';

const CloseIssue: React.FC = () => {
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
};

export default CloseIssue;
