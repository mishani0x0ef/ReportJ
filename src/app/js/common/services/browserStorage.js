import GeneralSettings from "app/js/common/models/settings/generalSettings";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

export default class BrowserStorage {
    constructor(browser) {
        this.browser = browser;
        this._defaultTemplates = [
            { templateId: 0, description: "Daily status meeting." },
            { templateId: 1, description: "Planning meeting." },
            { templateId: 2, description: "Retrospective meeting." },
            { templateId: 3, description: "Issue testing and verification." },
            { templateId: 4, description: "Code review." },
        ];
    }

    async getOptions() {
        const options = await new Promise((resolve) => {
            this.browser.storage.sync.get(["settings"], (storage) => {
                const settings = storage.settings || {};

                const defaultOptions = new GeneralSettings();
                const userOptions = settings.general || {};
                settings.general = Object.assign(defaultOptions, userOptions);

                settings.templates = settings.templates || this._defaultTemplates;
                settings.repositories = settings.repositories || [];

                resolve(settings);
            });
        });
        return options;
    }

    async getGeneralSettings() {
        const { general } = await this.getOptions();
        return general;
    }

    async getTemplates() {
        const { templates } = await this.getOptions();
        return templates;
    }

    async getRepositories() {
        const { repositories } = await this.getOptions();
        return repositories;
    }

    async setSettings(settings) {
        const currentOptions = await this.getOptions();
        const targetOptions = Object.assign(currentOptions, settings);

        return new Promise((resolve, reject) => {
            this.browser.storage.sync.set({ settings: targetOptions }, () => {
                const error = this.browser.runtime.lastError;
                if (isNil(error)) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }

    async setTemplate(template) {
        let templates = await this.getTemplates();
        const templatesMap = new Map(templates.map((t) => [t.templateId, t]));

        if (isNil(template.templateId)) {
            const ids = Array.from(templatesMap.keys());
            template.templateId = isEmpty(ids) ? 0 : Math.max(...ids) + 1;
        }
        templatesMap.set(template.templateId, template);

        templates = Array.from(templatesMap.values());
        await this.setSettings({ templates });
    }

    async removeTemplate(templateId) {
        let templates = await this.getTemplates();
        templates = templates.filter((t) => t.templateId !== templateId);
        await this.setSettings({ templates });
    }
}