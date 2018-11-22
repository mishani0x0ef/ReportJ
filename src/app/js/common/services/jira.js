import axios from "axios";
import { getBaseUrl } from "app/js/common/utils/url";

export default class JiraWrapper {
    constructor(baseJiraUrl) {
        if (typeof baseJiraUrl === "undefined") {
            baseJiraUrl = getBaseUrl(location.href);
        }
        this.jiraUrl = baseJiraUrl;

        this.issueInfoParams = "fields=summary,parent";
        this.apiUrl = `${baseJiraUrl}/rest/api/latest/`;
    }

    getIssueInfo(url) {
        const issueKey = this._getIssueKey(url);
        const apiUrl = `${this.apiUrl}issue/${issueKey}?${this.issueInfoParams}`;

        return axios.get(apiUrl).then((issue) => this._getSummaryFromIssue(issue));
    }

    checkIsInsideJira() {
        const url = this.apiUrl + "mypermissions";
        return axios.head(url)
            .then(() => true)
            .catch(() => false);
    }

    setRemainingEstimate(url, estimate) {
        estimate = estimate || "0m";
        const key = this._getIssueKey(url);
        const api = `${this.apiUrl}issue/${key}`;

        const requestData = {
            update: {
                timetracking: [
                    {
                        edit: { remainingEstimate: estimate }
                    }
                ]
            }
        };

        return axios.put(api, JSON.stringify(requestData));
    }

    _getSummaryFromIssue(issue, summary) {
        let issueTitle = issue.fields.summary;

        if (!summary) {
            summary = "";
        }
        if (issue.fields.parent) {
            summary = this._getSummaryFromIssue(issue.fields.parent, summary);
        }
        if (issueTitle[issueTitle.length - 1] != ".") {
            issueTitle += ".";
        }

        summary += `${issue.key}. ${issueTitle}\n`;
        return summary;
    }

    _getIssueKey(url) {
        const issueStartStrDetailsScreen = "browse/";
        const issueDetailsOpened = url.indexOf(issueStartStrDetailsScreen) > -1;
        let keyStartIndex, keyEndIndex;

        if (issueDetailsOpened) {
            const paramsIndex = url.indexOf("?");
            keyStartIndex = url.indexOf(issueStartStrDetailsScreen) + issueStartStrDetailsScreen.length;
            keyEndIndex = paramsIndex < 0 ? (url.length) : paramsIndex;
        } else {
            // issue selected on board.
            const issueStartStrBoard = "selectedIssue=";
            keyStartIndex = url.indexOf(issueStartStrBoard) + issueStartStrBoard.length;

            const nextParamIndex = url.indexOf("&", keyStartIndex);
            keyEndIndex = nextParamIndex < 0 ? (url.length) : nextParamIndex;
        }

        return url.substring(keyStartIndex, keyEndIndex);
    }
}