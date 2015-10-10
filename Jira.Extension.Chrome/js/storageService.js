jiraReporterApp.service('storageService', function ($q) {
    var self = this;
    
    this.getRepositories = function (callback) {
        chrome.storage.sync.get(["settings"], function(storage){
            if(typeof(storage.settings) !== "undefined" && storage.settings !== null) {
                if(typeof(storage.settings.repositories) !== "undefined" && storage.settings.repositories !== null) {
                    callback(storage.settings.repositories);
                    return;
                }
            }
            callback([]);
            return;
        });
    };
    
    this.saveRepositories = function (repositories, callback) {
        chrome.storage.sync.set({
            settings: {
                repositories: repositories
            }
            }, function () {
                var isSuccess = true;
                if(typeof(chrome.runtime.lastError) !== 'undefined' && chrome.runtime.lastError !== null){
                    console.error(chrome.runtime.lastError);
                    isSuccess = false;
                }
                callback(isSuccess);
            }
        );
    }
});