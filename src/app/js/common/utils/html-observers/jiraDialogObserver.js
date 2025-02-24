import ElementObserver from "./elementObserver";
import { isNil } from "app/js/common/utils/object";

export default class JiraDialogObserver extends ElementObserver {
    constructor(titleText) {
        super(".jira-dialog-content-ready");
        super.onAppear((element) => {
            const expectedDialog = this._isExpectedDialog(element, titleText);
            if (expectedDialog) {
                this._callHandlers(element, this.dialogHandlers);
            }
        })

        this.dialogHandlers = [];
    }

    onAppear(handler) {
        this.dialogHandlers.push(handler);
    }

    dispose() {
        super.dispose();
        this.dialogHandlers = null;
    }

    _isExpectedDialog(element, dialogTitleText) {
        const heading = element.querySelector(".aui-dialog2-header h2");
        const title = heading.title;
        return !isNil(title) && title.toLowerCase().includes(dialogTitleText.toLowerCase());
    }
}
