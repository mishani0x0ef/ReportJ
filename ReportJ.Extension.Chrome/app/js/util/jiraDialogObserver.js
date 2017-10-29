import ElementObserver from "./elementObserver";
import { isNil } from "~/js/util/object";

export default class JiraDialogObserver extends ElementObserver {
    constructor(titleText) {
        super(".jira-dialog-content-ready");
        super.onAppear(($element) => {
            const expectedDialog = this._isExpectedDialog($element, titleText);
            if (expectedDialog) {
                this._callHandlers($element, this.dialogHandlers);
            }
        })

        this.dialogHandlers = [];
    }

    onAppear(handler) {
        this.dialogHandlers.push(handler);
    }

    _isExpectedDialog($element, dialogTitleText) {
        const $heading = $element.find(".jira-dialog-heading h2");
        const title = $heading.attr("title");
        return !isNil(title) && title.toLowerCase().includes(dialogTitleText.toLowerCase());
    }
}