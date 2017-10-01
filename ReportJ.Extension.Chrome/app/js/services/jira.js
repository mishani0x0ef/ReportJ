import $ from "jquery";

export default class JiraWrapper {
    constructor(baseJiraUrl) {
        this.jiraUrl = baseJiraUrl;

        this.issueInfoParams = "fields=summary,parent";
        this.apiUrl = `${baseJiraUrl}/rest/api/latest/`;
    }

    getIssueInfo(url) {
        const issueKey = this._getIssueKey(url);
        const apiUrl = `${this.apiUrl}issue/${issueKey}?${this.issueInfoParams}`;

        return $.getJSON(apiUrl).then((issue) => this._getSummaryFromIssue(issue));
    }

    checkIsInsideJira() {
        const api = this.apiUrl + "mypermissions";
        const settings = {
            method: "GET",
            dataType: "json",
            url: api
        };

        return $.ajax(settings)
            .then(() => true)
            .catch(() => false);
    }

    setRemainingEstimate(url, estimate) {
        estimate = estimate || "0m";
        const key = this._getIssueKey(url);
        const api = `${this.apiUrl}issue/${key}`;

        const requestData = {
            "update":
            {
                "timetracking": [
                    {
                        "edit":
                        { "remainingEstimate": estimate }
                    }
                ]
            }
        };

        const settings = {
            method: "PUT",
            dataType: "json",
            contentType: 'application/json',
            url: api,
            data: JSON.stringify(requestData)
        };

        return $.ajax(settings);
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