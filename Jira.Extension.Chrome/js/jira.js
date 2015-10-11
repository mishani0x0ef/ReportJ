if ("undefined" === typeof jQuery) throw new Error("JiraWrapper JavaScript requires jQuery");

var JiraWrapper = function JiraWrapper(baseJiraUrl) {
    self = this;
    this.jiraUrl = baseJiraUrl;
    this.apiUrl = baseJiraUrl + "/rest/api/latest/issue/";

    this.resolveSummaryFromIssue = function (issue, summary) {
        var issueTitle = issue.fields.summary;
        if (!summary) {
            summary = "";
        }

        if (issue.fields.parent) {
            summary = this.resolveSummaryFromIssue(issue.fields.parent, summary);
        }
        if (issueTitle[issueTitle.length - 1] != ".") {
            issueTitle += ".";
        }

        summary += issue.key + ". " + issueTitle + "\n";
        return summary;
    };
};

JiraWrapper.prototype = {
    issueInfoParams: "fields=summary,parent",

    getIssueKey: function (url) {
        var issueStartStrDetailsScreen = "browse/";
        var issueStartStrBoard = "selectedIssue=";
        var startIndex, endIndex;

        // Issue details screen opened. MR
        if (url.indexOf(issueStartStrDetailsScreen) > -1) {
            startIndex = url.indexOf(issueStartStrDetailsScreen) + issueStartStrDetailsScreen.length;
            endIndex = url.indexOf("?") < 0 ? (url.length) : url.indexOf("?");
        }
        // Issue selected on board. MR
        else {
            startIndex = url.indexOf(issueStartStrBoard) + issueStartStrBoard.length;
            endIndex = url.indexOf("&", startIndex) < 0 ? (url.length) : url.indexOf("&", startIndex);
        }

        return url.substring(startIndex, endIndex);
    },

    getIssueInfo: function (issueKey, delegate, context) {
        var api = self.apiUrl + issueKey + "?" + self.issueInfoParams;
        $.getJSON(api, function (issue) {
            var summary = self.resolveSummaryFromIssue(issue);
            delegate(summary, context);
        });
    }
};