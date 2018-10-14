import * as bootbox from "./bootbox";

export function alert(message, caption) {
    bootbox.alert(message, caption);
}

export function confirm(message, caption) {
    return new Promise((resolve) => {
        bootbox.confirm(message, caption, (confirmed) => resolve(confirmed));
    });
}