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

    var getParentInfo = function (parent, info) {
        if (parent.fields.parent) {
            info = getParentInfo(parent.fields.parent, info);
        }
        info += parent.key + " " + parent.fields.summary + ". ";
        return info;
    }
    
    var getIssueInfo = function(issueKey, delegate){
        var api = apiUrl + issueKey + "?" + issueInfoParams;
        $.getJSON(api, function(issue){
            var summary = "";
            if(issue.fields.parent){
                summary = getParentInfo(issue.fields.parent, summary);
            }
            summary += issue.key + " " + issue.fields.summary + ". ";
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
                    code: "document.activeElement.value = '" + issueSummary + "'"
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
