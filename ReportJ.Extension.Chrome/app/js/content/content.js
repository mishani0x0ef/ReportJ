
import AutoIssueSumaryExtender from "./autoIssueSummary/autoIssueSummaryExtender";
import CloseIssueExtender from "./closeIssue/closeIssueExtender";
import StorageService from "~/js/services/storageService";

import { checkIsInsideJira } from "~/js/content/common/jiraUtil";

class ContentController {
    constructor(browser) {
        const storage = new StorageService(browser);

        Promise.all([storage.getGeneralSettings(), checkIsInsideJira()])
            .then((results) => {
                const settings = results[0];
                const insideJira = results[1];
                this._initExtenders(insideJira, settings);
            })
            .then(() => this.start());
    }

    start() {
        this.extenders.forEach((extender) => extender.start());
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