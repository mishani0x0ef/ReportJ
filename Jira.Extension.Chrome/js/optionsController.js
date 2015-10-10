jiraReporterApp.controller('OptionsController', function ($scope, $interval, $timeout) {
    
    var showNotification = function (isSuccess, message) {
        $scope.isNoticaitionSuccess = isSuccess;
        $scope.notificationMessage = message;
        $scope.notify = true;
        
        $timeout(function () {
            $scope.notify = false;         
        }, 5000);
    };
    
    $scope.svnRepositories = [
        { 
            Name: "Awersome application repository",
            Url: "http://repository.address/folder",
            UserName: "Mark.Commit",
            Password: "secret word"
        },
        { 
            Name: "Repository for very important things",
            Url: "http://svn.imporant-things/",
            UserName: "Mark.Commit",
            Password: "secret word"
        }
    ];
    
    $scope.addSvnRepository = function () {
        
    };
    
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