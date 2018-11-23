import ua from "universal-analytics";

const visitor = ua("UA-129676565-1");

export function pageview(page) {
    visitor.pageview(page, () => { });
}