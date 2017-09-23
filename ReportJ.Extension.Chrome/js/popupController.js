// Add this comment in order to avoid bug in Chrome - https://bugs.chromium.org/p/chromium/issues/detail?id=720597
jiraReporterApp.controller('PopupController', function ($scope, $timeout, storageService, repositoryService) {

    $scope.config = new AppConfig();
    $scope.insideJiraPage = false;

    var jira = {};

    var initJira = function () {
        const urlService = new UrlService();
        urlService.getCurrentBaseUrl()
            .then((url) => {
                jira = new JiraWrapper(url);
                return jira.checkIsInsideJira(url);
            })
            .then((inJira) => {
                $scope.insideJiraPage = inJira;
                $scope.$apply($scope.insideJiraPage);
            });
    }
    initJira();

    var resetLoadingDeferred = function () {
        $timeout(() => { $scope.loading = false; }, 200);
    }

    $scope.repoApiAvailable = false;
    $scope.svnCommits = [];
    $scope.templates = [];

    $scope.refreshCommits = function () {
        $scope.svnCommits = [];
        $scope.loading = true;
        $scope.loadingDescription = "Loading commits";
        storageService.getRepositories(function (repositories) {
            if (typeof repositories === "undefined" || repositories.length === 0) {
                resetLoadingDeferred();
            }
            angular.forEach(repositories, (repo) => {
                repositoryService.getLastCommits(repo, $scope.addCommits)
                    .then((commits) => { angular.copy(commits, $scope.svnCommits); })
                    .catch(() => {
                        const msg = `Oops! Something went wrong while getting your commits for '${repo.name}' repository.`;
                        dialog.alert(msg, "Warning!");
                    })
                    .finally(() => { $scope.loading = false; });
            });
        });
    };

    $scope.refreshTemplates = function () {
        $scope.templates = [];
        $scope.loading = true;
        $scope.loadingDescription = "Loading templates";
        storageService.getTemplates((templates) => {
            if (typeof templates !== "undefined" && templates.length !== 0) {
                angular.forEach(templates, (template) => {
                    $scope.templates.push(template);
                });
            }
            resetLoadingDeferred();
        });
    };

    $scope.openOptions = function () {
        chrome.tabs.create({
            url: "options.html"
        });
    };

    $scope.addIssueSummary = function () {
        chrome.tabs.getSelected(null, (tab) => {
            jira.getIssueInfo(tab.url)
                .then((summary) => {
                    const issueSummary = JSON.stringify(summary);
                    const code = `document.activeElement.value = ${issueSummary} + document.activeElement.value`;
                    chrome.tabs.executeScript({ code });
                });
        });
    };

    $scope.addMessageToReport = function (subject, message) {
        subject.justAdded = true;
        setTimeout(() => {
            subject.justAdded = false;
            $scope.$apply(subject);
        }, 1000);

        const code = `document.activeElement.value = document.activeElement.value + ${JSON.stringify(message)} + '\\n';true`;
        chrome.tabs.executeScript({ code });
    };

    this.initialize = function () {
        $scope.refreshTemplates();

        repositoryService.checkConnection()
            .then((established) => {
                $scope.repoApiAvailable = established;
                if (!established) {
                    throw new Error("Repo API unavailable");
                }
            })
            .then(() => $scope.refreshCommits())
            .catch(() => { $scope.repoApiAvailable = false; });
    }

    this.initialize();
});