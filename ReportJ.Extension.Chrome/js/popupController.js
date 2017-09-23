// Add this comment in order to avoid bug in Chrome - https://bugs.chromium.org/p/chromium/issues/detail?id=720597
jiraReporterApp.controller('PopupController', function ($scope, $timeout, storageService, repositoryService) {

    $scope.config = new AppConfig();
    $scope.insideJiraPage = false;

    var urlService = new UrlService();
    var jira = {};

    var initJira = function () {
        urlService.getCurrentBaseUrl(function (url) {
            jira = new JiraWrapper(url);
            jira.checkIsInsideJira(url)
                .then((inJira) => {
                    $scope.insideJiraPage = inJira;
                    $scope.$apply($scope.insideJiraPage);
                });
        });
    }
    initJira();

    $scope.repoApiAvailable = false;
    $scope.svnCommits = [];
    $scope.templates = [];

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
                repositoryService.getLastCommits(repo, $scope.addCommits)
                    .then(function (commits) {
                        angular.copy(commits, $scope.svnCommits);
                    })
                    .catch(function () {
                        var msg = "Oops! Something went wrong while getting your commits for '" + repo.name + "' repository.";
                        bootbox.alert(msg, "Warning!");
                    })
                    .finally(function () {
                        $scope.loading = false;
                    });
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
        setTimeout(function () {
            subject.justAdded = false;
            $scope.$apply(subject);
        }, 1000);

        chrome.tabs.executeScript({
            code: "document.activeElement.value = document.activeElement.value + " + JSON.stringify(message) + " + '\\n';true"
        });
    };

    this.initialize = function () {
        $scope.refreshTemplates();

        repositoryService.checkConnection()
            .then(function (established) {
                $scope.repoApiAvailable = established;
                if (!established) {
                    throw new Error("Repo API unavailable");
                }
            })
            .then(function () {
                $scope.refreshCommits();
            })
            .catch(function () {
                $scope.repoApiAvailable = false;
            });
    }

    this.initialize();
});