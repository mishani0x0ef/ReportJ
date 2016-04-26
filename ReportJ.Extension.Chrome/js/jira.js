if (typeof jQuery === "undefined") {
    throw new Error("JiraWrapper requires jQuery");
}

var JiraWrapper = function JiraWrapper(baseJiraUrl) {

    'use strict';

    var self = this;
    var issueInfoParams = "fields=summary,parent";
    var jiraUrl = baseJiraUrl;
    var apiUrl = baseJiraUrl + "/rest/api/latest/issue/";

    var resolveSummaryFromIssue = function (issue, summary) {
        var issueTitle = issue.fields.summary;
        if (!summary) {
            summary = "";
        }

        if (issue.fields.parent) {
            summary = resolveSummaryFromIssue(issue.fields.parent, summary);
        }
        if (issueTitle[issueTitle.length - 1] != ".") {
            issueTitle += ".";
        }

        summary += issue.key + ". " + issueTitle + "\n";
        return summary;
    };

    var getIssueKey = function (url) {
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
    };

    self.getIssueInfo = function (url, callback, callbackContext) {
        var issueKey = getIssueKey(url);
        var api = apiUrl + issueKey + "?" + issueInfoParams;
        $.getJSON(api, function (issue) {
            var summary = resolveSummaryFromIssue(issue);
            callback(summary, callbackContext);
        });
    };
};