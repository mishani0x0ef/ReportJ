if (typeof jQuery === "undefined") {
    throw new Error("JiraWrapper requires jQuery");
}

class JiraWrapper {
    constructor(baseJiraUrl) {
        this.jiraUrl = baseJiraUrl;

        this.issueInfoParams = "fields=summary,parent";
        this.apiUrl = `${baseJiraUrl}/rest/api/latest/`;
    }

    getIssueInfo(url, callback, callbackContext) {
        const issueKey = this._getIssueKey(url);
        const api = `${this.apiUrl}issue/${issueKey}?${this.issueInfoParams}`;

        return $.getJSON(api)
            .then((issue) => {
                const summary = this._resolveSummaryFromIssue(issue);
                callback(summary, callbackContext);
                return summary;
            });
    }

    checkIsInsideJira(callback) {
        const api = this.apiUrl + "mypermissions";
        $.ajax({
            method: "GET",
            dataType: "json",
            url: api,
            success: function () {
                callback(true);
            },
            error: function () {
                callback(false);
            }
        });
    }

    _resolveSummaryFromIssue(issue, summary) {
        let issueTitle = issue.fields.summary;

        if (!summary) {
            summary = "";
        }
        if (issue.fields.parent) {
            summary = this._resolveSummaryFromIssue(issue.fields.parent, summary);
        }
        if (issueTitle[issueTitle.length - 1] != ".") {
            issueTitle += ".";
        }

        summary += `${issue.key}. ${issueTitle}\n`;
        return summary;
    }

    _getIssueKey(url) {
        const issueStartStrDetailsScreen = "browse/";
        const issueStartStrBoard = "selectedIssue=";
        let startIndex, endIndex;

        if (url.indexOf(issueStartStrDetailsScreen) > -1) {
            // issue details screen opened.
            startIndex = url.indexOf(issueStartStrDetailsScreen) + issueStartStrDetailsScreen.length;
            endIndex = url.indexOf("?") < 0 ? (url.length) : url.indexOf("?");
        } else {
            // issue selected on board.
            startIndex = url.indexOf(issueStartStrBoard) + issueStartStrBoard.length;
            endIndex = url.indexOf("&", startIndex) < 0 ? (url.length) : url.indexOf("&", startIndex);
        }

        return url.substring(startIndex, endIndex);
    }
}