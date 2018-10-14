import { getBaseUrl } from "app/js/common/utils/url";

export default class UrlService {
    constructor(browser) {
        this.browser = browser;
    }

    async getCurrentBaseUrl() {
        const url = await new Promise((resolve) => {
            this.browser.tabs.getSelected(null, (tab) => {
                const baseUrl = getBaseUrl(tab.url);
                resolve(baseUrl);
            });
        });
        return url;
    }
}