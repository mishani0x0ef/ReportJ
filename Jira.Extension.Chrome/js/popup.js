(function (chrome) {
    var self = this;
    var eleksJiraUrl = "https://jd.eleks.com";
    
    $("#settings").click(function(){
        chrome.tabs.create({ url: "options.html" });
    });
    
    $("#addIssueSummary").click(function(){
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
    });
        
}(chrome));
