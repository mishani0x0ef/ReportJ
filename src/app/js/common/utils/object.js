export function isNil(obj) {
    return typeof (obj) === "undefined" || obj === null;
}

export function isEmpty(obj) {
    return isNil(obj) || obj.length < 1;
}