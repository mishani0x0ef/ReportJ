jiraReporterApp.controller('OptionsController', function ($scope) {
    
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

    var notifyOptionsSaving = function(isSuccess, title, message){
        new PNotify({
            title: title,
            text: message,
            type: isSuccess ? 'success' : 'error',
            cornerclass: 'ui-pnotify-sharp',
            delay: 2000,
            styling: 'bootstrap3',
            icon: isSuccess ? 'glyphicon glyphicon-ok-circle' : 'glyphicon glyphicon-remove-circle'
        });
    }
});