export function classIf(condition, className) {
    return condition ? className : "";
}

export function mergeClassNames(props, classNames) {
    const parentClasses = props && props.className ? props.className : "";
    const componentClasses = classNames || "";
    return `${componentClasses} ${parentClasses}`;
}

export function focusInput(input) {
    if (!input) return;

    const inputElement = input.inputElement;
    if (inputElement) {
        inputElement.focus();
    }
}

export function afterRender(func) {
    // need to allow React render DOM elements.
    setTimeout(() => func(), 0);
}