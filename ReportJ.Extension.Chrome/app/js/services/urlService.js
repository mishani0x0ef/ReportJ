export default class UrlService {
    constructor(browser) {
        this.browser = browser;
    }

    getCurrentBaseUrl() {
        return new Promise((resolve) => {
            this.browser.tabs.getSelected(null, (tab) => {
                const baseUrl = this.getBaseUrl(tab.url);
                resolve(baseUrl);
            });
        });
    }

    getBaseUrl(url) {
        const urlComponents = url.split("/");
        const protocol = urlComponents[0];
        const host = urlComponents[2];

        return `${protocol}//${host}`;
    }
}