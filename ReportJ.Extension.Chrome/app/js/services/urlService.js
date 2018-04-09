import { getBaseUrl } from "~/js/util/url";

export default class UrlService {
    constructor(browser) {
        this.browser = browser;
    }

    getCurrentBaseUrl() {
        return new Promise((resolve) => {
            this.browser.tabs.getSelected(null, (tab) => {
                const baseUrl = getBaseUrl(tab.url);
                resolve(baseUrl);
            });
        });
    }
}