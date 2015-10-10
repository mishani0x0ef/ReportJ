jiraReporterApp.controller('OptionsController', function ($scope, $interval, $timeout, storageService) {
    
    var showNotification = function (isSuccess, message) {
        $scope.isNoticaitionSuccess = isSuccess;
        $scope.notificationMessage = message;
        $scope.notify = true;
        
        $timeout(function () {
            $scope.notify = false;         
        }, 5000);
    };
    
    $scope.maxRepoQuota = 2;
    $scope.repositories = [];
    
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
        $scope.saveSettings();
    };
    
    $scope.removeRepository = function (repository) {
        var index = $scope.repositories.indexOf(repository);
        $scope.repositories.splice(index, 1);
        $scope.saveSettings();
    };
    
    $scope.saveSettings = function(){
        storageService.saveRepositories($scope.repositories, function (isSuccess) {
            var message = isSuccess ? "Options saved" : "Saving failed";
            showNotification(isSuccess, message);
            $scope.$apply();
        });
    };

    $scope.getSettings = function(){ 
        storageService.getRepositories(function (repositories) {
            $scope.repositories = [];
            angular.forEach(repositories, function (repo) {
                $scope.repositories.push(repo);                
            });
            $scope.$apply();
        });
    };
    $scope.getSettings();
});