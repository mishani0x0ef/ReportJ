
import CloseIssueExtender from "./closeIssue/closeIssueExtender";

class ContentController {
    constructor() {
        this.extenders = [];

        this.extenders.push(new CloseIssueExtender());
    }

    start() {
        this.extenders.forEach((extender) => {
            extender.start();
        });
    }
}

var contentController = new ContentController();
contentController.start();