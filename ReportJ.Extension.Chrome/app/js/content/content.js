import "app/css/content.scss";

import { AutoIssueSummaryExtender, CloseIssueExtender, CopyWorkLogExtender, LogTemplatesExtender, LogTimeExtender } from "./extenders";

import BrowserStorage from "app/js/common/services/browserStorage";
import { checkIsInsideJira } from "app/js/common/utils/jira";

class ContentController {
    constructor(browser) {
        this.browser = browser;
        this.storage = new BrowserStorage(browser);
    }

    start() {
        this.extenders = [];

        return Promise.all([this.storage.getGeneralSettings(), checkIsInsideJira()])
            .then(([settings, insideJira]) => {
                if (insideJira) {
                    this._addJiraExtenders(this.extenders, settings);
                }
                this.extenders.forEach((extender) => extender.start());
            });
    }

    _addJiraExtenders(extenders, settings) {
        extenders.push(
            new CloseIssueExtender(),
            new LogTimeExtender(),
            new LogTemplatesExtender(this.storage, this.browser),
            new CopyWorkLogExtender()
        );

        if (settings.autoIssueSummary.enabled) {
            extenders.push(new AutoIssueSummaryExtender());
        }
    }
}

var content = new ContentController(chrome);
content.start();