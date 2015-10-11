jiraReporterApp.controller('PopupController', function ($scope, storageService, commitsService) {

    var eleksJiraUrl = "https://jd.eleks.com";

    $scope.svnCommits = [];
    $scope.reportingAllowed = false;

    $scope.checkReportingAllowance = function () {
        chrome.tabs.getSelected(null, function (tab) {
            $scope.reportingAllowed = tab.url.indexOf(eleksJiraUrl) > -1;
            $scope.$apply($scope.reportingAllowed);
        });
    }
    $scope.checkReportingAllowance();

    $scope.addCommits = function (commits) {
        angular.forEach(commits, function (commit) {
            $scope.svnCommits.push(commit);
        });
    };

    $scope.refreshCommits = function () {
        $scope.svnCommits = [];
        storageService.getRepositories(function (repositories) {
            angular.forEach(repositories, function (repo) {
                commitsService.getLastCommits(repo, $scope.addCommits);
            })
        });
    };
    $scope.refreshCommits();

    $scope.openOptions = function () {
        chrome.tabs.create({
            url: "options.html"
        });
    };

    $scope.addIssueSummary = function () {
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

    $scope.addCommitInfo = function (commit) {
        commit.justAdded = true;
        setTimeout(function () {
            commit.justAdded = false;
            $scope.$apply(commit);
        }, 1000);

        chrome.tabs.executeScript({
            code: "document.activeElement.value = document.activeElement.value + " + JSON.stringify(commit.Message) + " + '\\n';true"
        });
    };
});