import { CommandResult, useCommand } from '../../../.common/hooks/use-command';
import { setRemainingEstimate } from '../../.common/services/jira';

type CloseCommandResult = Omit<CommandResult<void>, 'execute'> & {
  execute: () => Promise<void>;
};

export function useCloseIssueCommand(): CloseCommandResult {
  const { isLoading, execute, error } = useCommand();

  async function triggerOriginalClose() {
    const closeBtn = document.getElementById(
      'issue-workflow-transition-submit'
    );
    closeBtn.click();

    // wait for the original action to complete
    await new Promise((resolve) => setTimeout(resolve, 3_000));
  }

  async function closeIssueAndResetRemainingEstimate() {
    await execute(async () => {
      await setRemainingEstimate('0m');
      await triggerOriginalClose();
    });
  }

  return {
    isLoading,
    execute: closeIssueAndResetRemainingEstimate,
    error,
  };
}
