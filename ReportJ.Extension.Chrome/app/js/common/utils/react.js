export function classIf(condition, className) {
    return condition ? className : "";
}

export function mergeClassNames(props, classNames) {
    const parentClasses = props && props.className ? props.className : "";
    const componentClasses = classNames || "";
    return `${componentClasses} ${parentClasses}`;
}