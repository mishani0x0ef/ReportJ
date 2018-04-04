export function callIfExist(func, ...params) {
    if (typeof func === "function") {
        func(...params);
    }
}