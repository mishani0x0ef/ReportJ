import { useEffect } from 'react';
import { JiraIssueDetails, getIssue } from '../../.common/services/jira';
import { observeDialog } from '../../.common/utils/observe-dialog';

export function useAddSummaryCommand(): void {
  function getSummaryText(issue: JiraIssueDetails): string {
    const summary = issue.fields.summary;
    const parent = issue.fields.parent;

    return parent ? `${getSummaryText(parent)}\n${summary}` : summary;
  }

  async function addSummary(dialog: HTMLDivElement) {
    const summaryInput = dialog.querySelector('#comment') as HTMLInputElement;

    if (summaryInput.value) {
      // if somethings already there - probably user already filled it.
      return;
    }

    const issue = await getIssue();
    const summary = getSummaryText(issue);

    summaryInput.value = summary;
  }

  useEffect(() => {
    const { onShow, dispose } = observeDialog('Log work');

    onShow(addSummary);

    return function cleanup() {
      dispose();
    };
  }, []);
}
