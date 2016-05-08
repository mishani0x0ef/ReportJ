jiraReporterApp.controller('PopupController', function ($scope, $timeout, storageService, commitsService) {

    $scope.config = new AppConfig();
    $scope.insideJiraPage = false;

    var urlService = new UrlService();
    var jira = {};

    var initJira = function () {
        urlService.getCurrentBaseUrl(function (url) {
            jira = new JiraWrapper(url);
            jira.checkIsInsideJira(function (inJira) {
                $scope.insideJiraPage = inJira;
                $scope.$apply($scope.insideJiraPage);
            })
        });
    }
    initJira();

    $scope.svnCommits = [];
    $scope.templates = [];

    $scope.addCommits = function (commits) {
        angular.forEach(commits, function (commit) {
            $scope.svnCommits.push(commit);
        });
        $scope.loading = false;
    };

    $scope.refreshCommits = function () {
        $scope.svnCommits = [];
        $scope.loading = true;
        $scope.loadingDescription = "Loading commits";
        storageService.getRepositories(function (repositories) {
            if (typeof repositories === "undefined" || repositories.length === 0) {
                $timeout(function () {
                    $scope.loading = false;
                }, 200);
            }
            angular.forEach(repositories, function (repo) {
                commitsService.getLastCommits(repo, $scope.addCommits);
            });
        });
    };

    $scope.refreshTemplates = function () {
        $scope.templates = [];
        $scope.loading = true;
        $scope.loadingDescription = "Loading templates";
        storageService.getTemplates(function (templates) {
            if (typeof templates === "undefined" || templates.length === 0) {
                $timeout(function () {
                    $scope.loading = false;
                }, 200);
            }
            angular.forEach(templates, function (template) {
                $scope.templates.push(template);
            });
            $timeout(function () {
                $scope.loading = false;
            }, 200);
        });
    };
    $scope.refreshTemplates();

    $scope.openOptions = function () {
        chrome.tabs.create({
            url: "options.html"
        });
    };

    $scope.addIssueSummary = function () {
        chrome.tabs.getSelected(null, function (tab) {
            jira.getIssueInfo(
                tab.url,
                function (issueSummary, context) {
                    chrome.tabs.executeScript({
                        code: "document.activeElement.value = " + JSON.stringify(issueSummary) + " + document.activeElement.value"
                    })
                }, chrome);
        });
    };

    $scope.addMessageToReport = function (subject, message) {
        subject.justAdded = true;
        setTimeout(function () {
            subject.justAdded = false;
            $scope.$apply(subject);
        }, 1000);

        chrome.tabs.executeScript({
            code: "document.activeElement.value = document.activeElement.value + " + JSON.stringify(message) + " + '\\n';true"
        });
    };
});