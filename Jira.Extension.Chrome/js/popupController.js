jiraReporterApp.controller('PopupController', function ($scope) {
    
    var eleksJiraUrl = "https://jd.eleks.com";

    $scope.svnCommits = [];
//        [{
//        author: "Mark Commit",
//        date: "21 Aug 21:45",
//        message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita accusantium, pariatur voluptatem, commodi recusandae alias consequuntur. Dignissimos libero, optio a vitae. Accusamus a deleniti sed eaque!"
//        }, {
//        author: "Adam Merge",
//        date: "21 Aug 21:45",
//        message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita accusantium, pariatur voluptatem, commodi recusandae alias consequuntur. Dignissimos libero, optio a vitae. Accusamus a deleniti sed eaque!"
//        }, {
//        author: "Ostin Revert",
//        date: "21 Aug 21:45",
//        message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita accusantium, pariatur voluptatem, commodi recusandae alias consequuntur. Dignissimos libero, optio a vitae. Accusamus a deleniti sed eaque!"
//        }, {
//        author: "Lora Pull",
//        date: "21 Aug 21:45",
//        message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita accusantium, pariatur voluptatem, commodi recusandae alias consequuntur. Dignissimos libero, optio a vitae. Accusamus a deleniti sed eaque!"
//        }];
    
    $scope.refreshCommits = function() {
        alert("Inside refreshCommits");
        var repository = new RepositoryApi();
        repository.getLastSvnCommits(
            {
                repoUrl: "test",
                username: "test", 
                password: "test", 
                count: 5
            }, 
            function(data) {
                alert(data.length);
                $scope.svnCommits = data;                
            }
        );
    };
    $scope.refreshCommits();

    $scope.openOptions = function() {
        chrome.tabs.create({
            url: "options.html"
        });
    };

    $scope.addIssueSummary = function() {
        chrome.tabs.getSelected(null, function (tab) {
            var jira = new JiraWrapper(eleksJiraUrl);
            var issueKey = jira.getIssueKey(tab.url);
            jira.getIssueInfo(
                issueKey,
                function (issueSummary, context) {
                    chrome.tabs.executeScript({
                        code: "document.activeElement.value = " + JSON.stringify(issueSummary) + " + document.activeElement.value"
                    })
                }, chrome);
        });
    };
    
    $scope.addCommitInfo = function(commit) {
        chrome.tabs.executeScript({
            code: "document.activeElement.value = document.activeElement.value + " + JSON.stringify(commit.message)
        });
    };
});