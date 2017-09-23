if (typeof bootbox === "undefined") {
    throw new Error("bootbox is required from dialog");
}

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

// init global dialog.
window.dialog = new Dialog();