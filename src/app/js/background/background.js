import "app/js/common/utils/axios.config";

import JiraWrapper from "app/js/common/services/jira";
import config from "app/config";
import { getBaseUrl } from "app/js/common/utils/url";

class BackgroundWorker {
    constructor(browser) {
        this.browser = browser;

        this.contextMenus = {
            addIssueSummaryId: "3956cb0d-9144-468a-a76e-7d67c58f7949",
        };

        this.browser.runtime.onInstalled.addListener((e) => this.onInstalled(e));
        this.browser.contextMenus.onClicked.addListener((e) => this.onContextMenuClick(e));
    }

    initialize() {

    }

    onInstalled() {
        this.createContextMenu();
    }

    createContextMenu() {
        const context = "editable";
        const title = `${config.app.name} add issue summary`;
        this.browser.contextMenus.create({
            "title": title,
            "contexts": [context],
            "type": 'normal',
            "id": this.contextMenus.addIssueSummaryId,
        });
    }

    onContextMenuClick(e) {
        if (e.menuItemId === this.contextMenus.addIssueSummaryId) {
            this.addIssueSummary();
        }
    }

    addIssueSummary() {
        this.browser.tabs.getSelected(null, (tab) => {
            const baseUrl = getBaseUrl(tab.url);
            const jira = new JiraWrapper(baseUrl);

            jira.getIssueInfo(tab.url)
                .then((summary) => {
                    const issueSummary = JSON.stringify(summary);
                    const code = `document.activeElement.value = ${issueSummary} + document.activeElement.value`;
                    this.browser.tabs.executeScript({ code });
                });
        });
    }
}

export default new BackgroundWorker(chrome);