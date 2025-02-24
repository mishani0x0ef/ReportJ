import "./logTimeExtender.scss";

import { createElement, insertAfter } from "app/js/common/utils/html";

import JiraDialogObserver from "app/js/common/utils/html-observers/jiraDialogObserver";
import React from "react";
import { TimeSelector } from "./components/timeSelector";
import { render } from "react-dom";

export class LogTimeExtender {
    constructor() {
        this.hours = ["0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"];
        this.minutes = ["0m", "15m", "30m", "45m"];
    }

    start() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear((dialog) => {
            const logTimeInput = dialog.querySelector("#log-work-form-time-logged");
            const featureContainer = createElement(`<div class="reportj-log-time"></div>`);
            insertAfter(featureContainer, logTimeInput);

            render(<TimeSelector hours={this.hours} minutes={this.minutes} onSubmit={(time) => this.setLogTimeToJira(time)} />,
                featureContainer);
        });
    }

    setLogTimeToJira(time) {
        const timeInput = document.getElementById("log-work-form-time-logged");
        timeInput.value = time;
    }
}
