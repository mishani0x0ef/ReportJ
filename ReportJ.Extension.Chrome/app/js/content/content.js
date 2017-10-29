
import AutoIssueSumaryExtender from "./autoIssueSummary/autoIssueSummaryExtender";
import CloseIssueExtender from "./closeIssue/closeIssueExtender";
import JiraWrapper from "~/js/services/jira";
import StorageService from "~/js/services/storageService";
import UrlService from "~/js/services/urlService";

class ContentController {
    constructor(browser) {
        const storage = new StorageService(browser);
        const urlService = new UrlService(browser);
        const baseUrl = urlService.getBaseUrl(location.href);
        const jira = new JiraWrapper(baseUrl);

        let generalSettings;

        storage.getGeneralSettings()
            .then((settings) => {
                generalSettings = settings;

                if (settings.optimisationsForNonJiraPages.enabled) {
                    return jira.checkIsInsideJira(baseUrl);
                }
                return Promise.resolve(true);
            })
            .then((insideJira) => this._initExtenders(insideJira, generalSettings))
            .then(() => this.start());
    }

    start() {
        this.extenders.forEach((extender) => {
            extender.start();
        });
    }

    _initExtenders(insideJira, settings) {
        this.extenders = [];

        if (insideJira) {
            this._addJiraExtenders(this.extenders, settings);
        }
    }

    _addJiraExtenders(extenders, settings) {
        extenders.push(new CloseIssueExtender());

        if (settings.autoIssueSummary.enabled) {
            extenders.push(new AutoIssueSumaryExtender());
        }
    }
}

var contentController = new ContentController(chrome);