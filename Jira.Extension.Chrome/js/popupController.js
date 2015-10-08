jiraReporterApp.controller('PopupController', function ($scope) {
    
    var eleksJiraUrl = "https://jd.eleks.com";

    $scope.svnCommits = [];
    $scope.reportingAllowed = false;
    
    $scope.checkReportingAllowance = function() {
        chrome.tabs.getSelected(null, function(tab) {
            $scope.reportingAllowed = tab.url.indexOf(eleksJiraUrl) > -1;
            $scope.$apply($scope.reportingAllowed);
        });
    }
    $scope.checkReportingAllowance();
    
    $scope.refreshCommits = function() {
        var repository = new RepositoryApi();
        repository.getLastSvnCommits(
            {
                repoUrl: "test",
                username: "test", 
                password: "test", 
                count: 5
            }, 
            function(data) {
                $scope.svnCommits = data;
                $scope.$apply($scope.svnCommits);
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
        commit.justAdded = true;
        setTimeout(function() {
            commit.justAdded = false;
            $scope.$apply(commit);
        }, 1000);
        
        chrome.tabs.executeScript({
            code: "document.activeElement.value = document.activeElement.value + " + JSON.stringify(commit.Message) + " + '\\n';true"
        });
    };
});