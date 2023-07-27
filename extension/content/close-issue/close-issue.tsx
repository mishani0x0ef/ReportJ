import React from 'react';
import { createPortal } from 'react-dom';
import Button from '../.common/components/button/button';
import { useTarget } from './hooks/use-target';

const CloseIssue: React.FC = () => {
  const featureTarget = useTarget();

  function closeIssueAndResetRemainingEstimate() {
    console.log('[ReportJ] Close issue and reset remaining estimate');
  }

  if (!featureTarget) {
    return null;
  }

  return createPortal(
    <Button
      title="Close issue and reset remaining estimate"
      type="submit"
      onClick={closeIssueAndResetRemainingEstimate}
    >
      Close with ReportJ
    </Button>,
    featureTarget
  );
};

export default CloseIssue;
