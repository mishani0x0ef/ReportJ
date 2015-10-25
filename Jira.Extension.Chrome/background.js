(function (chrome) {
    var self = this;
    var eleksJiraUrl = "https://jd.eleks.com";
    
    var contextMenuHandler = function(e){
        if(e.menuItemId !== self.contextMenuId){
            return;
        };
        
        chrome.tabs.getSelected(null, function(tab) {             
            var jira = new JiraWrapper(eleksJiraUrl);
            var issueKey = jira.getIssueKey(tab.url);
            jira.getIssueInfo(
                issueKey
                ,function(issueSummary, context){
                    context.chrome.tabs.executeScript({
                        code: "document.activeElement.value = " + JSON.stringify(issueSummary) + " + document.activeElement.value"
                })} 
                ,self);          
        });
    }
    
    var initContextMenu = function() {
        var context = "editable";
        var title = "JIRA add issue summary";
        self.contextMenuId = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});  
    }
    initContextMenu();

    chrome.contextMenus.onClicked.addListener(contextMenuHandler);
    
}(chrome));
