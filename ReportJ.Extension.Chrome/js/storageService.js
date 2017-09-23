jiraReporterApp.service('storageService', function ($q) {
    var self = this;

    var defaultTemplates = [
        { templateId: 0, description: "Daily status meeting." },
        { templateId: 1, description: "Planning meeting." },
        { templateId: 2, description: "Retrospective meeting." },
        { templateId: 3, description: "Issue testing and verification." },
        { templateId: 4, description: "Deployment of {component_name} v.{version_number} on Production environment." }
    ];

    this.getTemplates = function () {
        return new Promise((resolve) => {
            chrome.storage.sync.get(["settings"], (storage) => {
                const templateExists = !isNil(storage.settings) && !isNil(storage.settings.templates);
                if (templateExists) {
                    resolve(storage.settings.templates);
                } else {
                    const settings = {
                        templates: defaultTemplates
                    };
                    self.saveSettings(settings);
                    resolve(defaultTemplates);
                }
            });
        });
    };

    this.getRepositories = function () {
        return new Promise((resolve) => {
            chrome.storage.sync.get(["settings"], (storage) => {
                const reposExists = !isNil(storage.settings) && !isNil(storage.settings.repositories);
                const repos = reposExists ? storage.settings.repositories : [];
                resolve(repos);
            });
        });
    };

    this.saveSettings = function (settings) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({ settings }, () => {
                if (isNil(chrome.runtime.lastError)) {
                    resolve();
                } else {
                    reject(chrome.runtime.lastError);
                }
            });
        });
    };

    // todo: move to some kinds of utils. MR
    function isNil(obj) {
        return typeof (obj) === "undefined" || obj === null;
    }
});