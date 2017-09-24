import AppConfig from "./config";
import JiraWrapper from "./js/jira";
import UrlService from "./js/urlService";
import { getRandomString } from "./js/util/string";

class BackgroundWorker {
    constructor(browser) {
        this.browser = browser;
        this.config = new AppConfig();
        this.urlService = new UrlService();

        this.initContextMenu();
        this.browser.contextMenus.onClicked.addListener(this.contextMenuHandler);
    }

    contextMenuHandler(e) {
        if (e.menuItemId !== self.contextMenuId) {
            return;
        }

        this.browser.tabs.getSelected(null, (tab) => {
            const baseUrl = this.urlService.getBaseUrl(tab.url);
            const jira = new JiraWrapper(baseUrl);

            jira.getIssueInfo(tab.url)
                .then((summary) => {
                    const issueSummary = JSON.stringify(summary);
                    const code = `document.activeElement.value = ${issueSummary} + document.activeElement.value`;
                    this.browser.tabs.executeScript({ code });
                });
        });
    }

    initContextMenu() {
        const context = "editable";
        const title = this.config.app.name + " add issue summary";
        this.contextMenuId = this.browser.contextMenus.create({
            "title": title,
            "contexts": [context],
            "id": getRandomString()
        });
    }
}

export default new BackgroundWorker(chrome);