(function (chrome) {
    var self = this;
    self.eleksJiraUrl = "https://jd.eleks.com";
    this.apiUrl = "https://jd.eleks.com/rest/api/latest/issue/";
    this.issueInfoParams = "fields=summary,parent";
    this.contextMenuId = 0;

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
    }

    var resolveSummaryFromIssue = function (issue, summary) {
        var issueTitle = issue.fields.summary;
        if (!summary) {
            summary = "";
        }

        if (issue.fields.parent) {
            summary = resolveSummaryFromIssue(issue.fields.parent, summary);
        }
        if(issueTitle[issueTitle.length - 1] != "."){
                issueTitle += ".";
        }
        
        summary += issue.key + ". " + issueTitle + "\n";
        return summary;
    }
    
    var getIssueInfo = function(issueKey, delegate){
        var api = apiUrl + issueKey + "?" + issueInfoParams;
        $.getJSON(api, function(issue){
            var summary = resolveSummaryFromIssue(issue);
            delegate(summary);
        });
    }
    
    var contextMenuHandler = function(e){
        chrome.tabs.getSelected(null, function(tab) {
            if(e.menuItemId !== self.contextMenuId){
                return;
            }
            var issueKey = getIssueKey(tab.url);
            getIssueInfo(issueKey, function(issueSummary){
                chrome.tabs.executeScript({
                    code: "document.activeElement.value = " + JSON.stringify(issueSummary) + " + document.activeElement.value"
                });
            });            
        });
    }
    
    chrome.runtime.onInstalled.addListener(function() {
        var context = "editable";
        var title = "JIRA add issue summary";
        self.contextMenuId = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});  
    });

    chrome.contextMenus.onClicked.addListener(contextMenuHandler);
    
}(chrome));
