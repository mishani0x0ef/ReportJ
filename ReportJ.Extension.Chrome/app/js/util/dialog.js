import * as bootbox from "./bootbox";

class Dialog {
    alert(message, caption) {
        bootbox.alert(message, caption);
    }

    confirm(message, caption) {
        return new Promise((resolve) => {
            bootbox.confirm(message, caption, (confirmed) => resolve(confirmed));
        });
    }
}

export default new Dialog();