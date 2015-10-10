jiraReporterApp.controller('OptionsController', function ($scope, $interval, $timeout) {
    
    var showNotification = function (isSuccess, message) {
        $scope.isNoticaitionSuccess = isSuccess;
        $scope.notificationMessage = message;
        $scope.notify = true;
        
        $timeout(function () {
            $scope.notify = false;         
        }, 5000);
    };
    
    $scope.maxRepoQuota = 2;
    $scope.repositories = [
        { 
            repositoryId: 1,
            type: "svn",
            name: "Repository for very important things",
            url: "http://svn.imporant-things/",
            userName: "Mark.Commit",
            password: "secret word",
            passwordConfirm: "secret word"
        },
        { 
            repositoryId: 0,
            type: "svn",
            name: "Awersome application repository",
            url: "http://repository.address/folder",
            userName: "Mark.Commit",
            password: "secret word",
            passwordConfirm: "secret word"
        },
        { 
            repositoryId: 2,
            type: "git",
            name: "It's mine gite repository",
            url: "http://git.mine-only/",
            userName: "Mark.Commit",
            password: "secret word",
            passwordConfirm: "secret word"
        }
    ];
    
    $scope.$watchCollection('repositories', function(newRepositories, oldRepositories) {
        var svnReposCount = 0, 
            gitReposCount = 0;
        
        angular.forEach(newRepositories, function (repo) {
            switch(repo.type) {
                case "svn":
                    svnReposCount++;
                    break;
                case "git":
                    gitReposCount++;
                    break;
                default:
                    break;
            }
        });
        
        $scope.isMaxSvnRepoCountExceed = svnReposCount >= $scope.maxRepoQuota;
        $scope.isMaxGitRepoCountExceed = gitReposCount >= $scope.maxRepoQuota;
    });
    
    $scope.editedRepository = "";
    
    $scope.editRepository = function (repository, repositoryType) {
        if(typeof (repository) !== "undefined" && repository !== null){
            $scope.editedRepository = angular.copy(repository);
        }
        else {
            $scope.editedRepository = {};
            $scope.editedRepository.type = repositoryType;
        }
        
        $("#repositoryEditModal").modal("show");
    };
    
    $scope.saveRepository = function (repository) {
        if(typeof (repository.repositoryId) === "undefined") {
            var repoId = 0;
            angular.forEach($scope.repositories, function (repo) {
                if(repo.repositoryId > repoId) {
                    repoId = repo.repositoryId;
                }
            });
            repository.repositoryId = ++repoId;
            
            $scope.repositories.push(repository);
        }
        else { 
            angular.forEach($scope.repositories, function (repo) {
                if(repo.repositoryId === repository.repositoryId) {
                    angular.copy(repository, repo);                    
                }
            });
        }
        
        $("#repositoryEditModal").modal("hide");
        //todo: implement saving settings into chrome storage and notification about success. MR
    };
    
    $scope.removeRepository = function (repository) {
        var index = $scope.repositories.indexOf(repository);
        $scope.repositories.splice(index, 1);
        //todo: implement saving settings into chrome storage and notification about success. MR
    }
    
    // Mock of method for saving settings.
    // todo: finish that method with appropriate exception handling and saving. MR
    $scope.saveSettings = function(settings){
        chrome.runtime.lastError = null;
    
        chrome.storage.sync.set({
            settings: settings
            }, function(){        
                if(typeof(chrome.runtime.lastError) !== 'undefined' && chrome.runtime.lastError !== null){
                    message.message = chrome.runtime.lastError;
                }
            }
        );
    }

    // Mock of method for getting settings.
    // todo: finish that method with appropriate exception handling and getting. MR
    $scope.getSettings = function(){    
        chrome.storage.sync.get(["settings1", "settings2"], function(options){        
        });
    }
});