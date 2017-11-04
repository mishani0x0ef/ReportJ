/**
 * Identify is current page Jira, based on it's content.
 */
export function checkIsInsideJira() {
    return new Promise((resolve) => {
        const acceptableStates = ["loaded", "interactive", "complete"];
        const alreadyLoaded = acceptableStates.includes(document.readyState);

        if (alreadyLoaded) {
            const inJira = checkIsDocumentHasJiraMarkers();
            resolve(inJira);
        } else {
            document.addEventListener("DOMContentLoaded", () => {
                const inJira = checkIsDocumentHasJiraMarkers();
                resolve(inJira);
            });
        }
    });
}

function checkIsDocumentHasJiraMarkers() {
    const jiraBodyId = "jira";
    const bodyId = document.body.id || "";

    return jiraBodyId === bodyId.toLowerCase();
}