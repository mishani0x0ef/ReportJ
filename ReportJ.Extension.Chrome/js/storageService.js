jiraReporterApp.service('storageService', function ($q) {
    var self = this;
    
    var defaultTemplates = [
        {templateId: 0, description: "Daily status meeting."},
        {templateId: 1, description: "Planning meeting."},
        {templateId: 2, description: "Retrospective meeting."},
        {templateId: 3, description: "Issue testing and verification."},
        {templateId: 4, description: "Deployment of {component_name} v.{version_number} on Production environment."}
    ];
    
    this.getTemplates = function (callback) {
        chrome.storage.sync.get(["settings"], function (storage) {
            if (typeof (storage.settings) !== "undefined" && storage.settings !== null) {
                if (typeof (storage.settings.templates) !== "undefined" && storage.settings.templates !== null) {
                    callback(storage.settings.templates);
                    return;
                }
            }
            self.saveTemplates(defaultTemplates, function(){});
            callback(defaultTemplates);
            return;
        });
    };

    this.getRepositories = function (callback) {
        chrome.storage.sync.get(["settings"], function (storage) {
            if (typeof (storage.settings) !== "undefined" && storage.settings !== null) {
                if (typeof (storage.settings.repositories) !== "undefined" && storage.settings.repositories !== null) {
                    callback(storage.settings.repositories);
                    return;
                }
            }
            callback([]);
            return;
        });
    };
    
    this.saveSettings = function (settings, callback) {
        chrome.storage.sync.set({
            settings: settings
        }, function () {
            var isSuccess = true;
            if (typeof (chrome.runtime.lastError) !== 'undefined' && chrome.runtime.lastError !== null) {
                console.error(chrome.runtime.lastError);
                isSuccess = false;
            }
            callback(isSuccess);
        });
    }
});