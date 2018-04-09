export function openSettings(browser) {
    const url = getSettingsUrl(browser);
    window.open(url);
}

export function getSettingsUrl(browser) {
    return browser.extension.getURL("options.html");
}