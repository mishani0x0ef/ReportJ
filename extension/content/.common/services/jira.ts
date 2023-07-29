import { ensureSuccess } from '../utils/response';

function createUrl(relative: string): string {
  const urlComponents = location.href.split('/');
  const protocol = urlComponents[0];
  const host = urlComponents[2];

  return `${protocol}//${host}/rest/api/latest${relative}`;
}

function getIssueId(): string {
  const url = new URL(location.href);
  const isIssueDetails = url.pathname.includes('browse/');

  return isIssueDetails
    ? url.pathname.split('/').pop()
    : url.searchParams.get('selectedIssue');
}

type Estimate = `${number}${'d' | 'h' | 'm' | ''}`;

export async function setRemainingEstimate(estimate: Estimate): Promise<void> {
  const url = createUrl(`/issue/${getIssueId()}`);

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      update: { timetracking: [{ edit: { remainingEstimate: estimate } }] },
    }),
  });

  ensureSuccess(response, '[ReportJ] Failed to set remaining estimate');
}

export type JiraIssue = {
  fields: {
    summary: string;
    parent?: JiraIssue;
  };
};

export async function getIssue(): Promise<JiraIssue> {
  const url = createUrl(`/issue/${getIssueId()}?fields=summary,parent`);
  const response = await fetch(url);

  ensureSuccess(response, '[ReportJ] Failed to get issue details');

  return (await response.json()) as JiraIssue;
}
