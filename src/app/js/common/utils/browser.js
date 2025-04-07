export function openSettings(browser) {
    const url = getSettingsUrl(browser);
    browser.open(url);
}

export function getSettingsUrl(browser) {
    return browser.runtime.getURL("options.html");
}

export function addTextToInput(browser, text) {
    const code = `document.activeElement.value = document.activeElement.value + ${JSON.stringify(text)} + '\\n';true`;
    browser.scripting.executeScript({ code });
}
