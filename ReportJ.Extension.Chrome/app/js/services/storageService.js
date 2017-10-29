import GeneralSettings from "~/js/models/settings/generalSettings";

import { isNil } from "~/js/util/object";

export default function StorageService(browser) {
    var that = this;

    var defaultTemplates = [
        { templateId: 0, description: "Daily status meeting." },
        { templateId: 1, description: "Planning meeting." },
        { templateId: 2, description: "Retrospective meeting." },
        { templateId: 3, description: "Issue testing and verification." },
        { templateId: 4, description: "Deployment of {component_name} v.{version_number} on Production environment." }
    ];

    this.getGeneralSettings = function () {
        return new Promise((resolve) => {
            browser.storage.sync.get(["settings"], (storage) => {
                const settingsExists = !isNil(storage.settings) && !isNil(storage.settings.general);
                const defaultSettings = new GeneralSettings();
                if (settingsExists) {
                    const settings = Object.assign(defaultSettings, storage.settings.general);
                    resolve(settings);
                } else {
                    const settings = { general: defaultSettings };
                    that.saveSettings(settings);
                    resolve(defaultSettings);
                }
            });
        });
    }

    this.getTemplates = function () {
        return new Promise((resolve) => {
            browser.storage.sync.get(["settings"], (storage) => {
                const templateExists = !isNil(storage.settings) && !isNil(storage.settings.templates);
                if (templateExists) {
                    resolve(storage.settings.templates);
                } else {
                    const settings = {
                        templates: defaultTemplates
                    };
                    that.saveSettings(settings);
                    resolve(defaultTemplates);
                }
            });
        });
    };

    this.getRepositories = function () {
        return new Promise((resolve) => {
            browser.storage.sync.get(["settings"], (storage) => {
                const reposExists = !isNil(storage.settings) && !isNil(storage.settings.repositories);
                const repos = reposExists ? storage.settings.repositories : [];
                resolve(repos);
            });
        });
    };

    this.saveSettings = function (settings) {
        return new Promise((resolve, reject) => {
            browser.storage.sync.set({ settings }, () => {
                if (isNil(browser.runtime.lastError)) {
                    resolve();
                } else {
                    reject(browser.runtime.lastError);
                }
            });
        });
    };
}

StorageService.$inject = ["browser"];