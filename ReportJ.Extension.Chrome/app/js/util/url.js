export function getBaseUrl(url) {
    const urlComponents = url.split("/");
    const protocol = urlComponents[0];
    const host = urlComponents[2];

    return `${protocol}//${host}`;
}