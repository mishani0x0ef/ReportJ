export function isModifierKeyPressed(event) {
    return event.ctrlKey || event.shiftKey || event.altKey;
}

export function isKeyDown(event, keyCode, ignoreModifierKeys = false) {
    return (ignoreModifierKeys || !isModifierKeyPressed(event)) && event.keyCode === keyCode;
}

export function isEnterDown(event, ignoreModifierKeys = false) {
    return isKeyDown(event, 13, ignoreModifierKeys);
}

export function isEscapeDown(event, ignoreModifierKeys = false) {
    return isKeyDown(event, 27, ignoreModifierKeys);
}