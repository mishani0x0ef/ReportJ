export function openSettings(browser) {
    const url = getSettingsUrl(browser);
    window.open(url);
}

export function getSettingsUrl(browser) {
    return browser.extension.getURL("options.html");
}

export function addTextToInput(browser, text) {
    const code = `document.activeElement.value = document.activeElement.value + ${JSON.stringify(text)} + '\\n';true`;
    browser.tabs.executeScript({ code });
}
