import { raise } from '../utils/raise';

type Estimate = `${number}${'d' | 'h' | 'm' | ''}`;

function getApiUrl(): string {
  const urlComponents = location.href.split('/');
  const protocol = urlComponents[0];
  const host = urlComponents[2];

  return `${protocol}//${host}/rest/api/latest`;
}

// TODO: refactor method to be more pretty.
function getIssueId(): string {
  const url = location.href;
  const issueStartStrDetailsScreen = 'browse/';
  const issueDetailsOpened = url.includes(issueStartStrDetailsScreen);
  let keyStartIndex, keyEndIndex;

  if (issueDetailsOpened) {
    const paramsIndex = url.indexOf('?');
    keyStartIndex =
      url.indexOf(issueStartStrDetailsScreen) +
      issueStartStrDetailsScreen.length;
    keyEndIndex = paramsIndex < 0 ? url.length : paramsIndex;
  } else {
    // issue selected on board.
    const issueStartStrBoard = 'selectedIssue=';
    keyStartIndex = url.indexOf(issueStartStrBoard) + issueStartStrBoard.length;

    const nextParamIndex = url.indexOf('&', keyStartIndex);
    keyEndIndex = nextParamIndex < 0 ? url.length : nextParamIndex;
  }

  return url.substring(keyStartIndex, keyEndIndex);
}

function success(response: Response): boolean {
  return response.status >= 200 && response.status < 300;
}

export async function setRemainingEstimate(estimate: Estimate): Promise<void> {
  const url = `${getApiUrl()}/issue/${getIssueId()}`;

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      update: { timetracking: [{ edit: { remainingEstimate: estimate } }] },
    }),
  });

  raise(success(response), '[ReportJ] Failed to set remaining estimate');
}

export type JiraIssueDetails = {
  fields: {
    summary: string;
    parent?: JiraIssueDetails;
  };
};

export async function getIssue(): Promise<JiraIssueDetails> {
  const url = `${getApiUrl()}/issue/${getIssueId()}?fields=summary,parent`;
  console.log(url);
  const response = await fetch(url);
  console.log(response);

  raise(success(response), '[ReportJ] Failed to get issue details');

  return (await response.json()) as JiraIssueDetails;
}
