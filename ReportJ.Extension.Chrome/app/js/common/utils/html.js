export function insertBefore(newElement, refElement) {
    refElement.parentNode.insertBefore(newElement, refElement);
}

export function insertAfter(newElement, refElement) {
    refElement.parentNode.insertBefore(newElement, refElement.nextSibling);
}

export function createElement(htmlTemplate) {
    const div = document.createElement("div");
    div.innerHTML = htmlTemplate.trim();
    return div.firstChild;
}