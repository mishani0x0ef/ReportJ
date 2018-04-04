import "./logTimeExtender.scss";

import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import React from "react";
import { TimeSelector } from "./components/timeSelector";
import { insertAfter } from "~/js/util/html";
import { render } from "react-dom";

export class LogTimeExtender {
    constructor() {
        this.hours = ["0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"];
        this.minutes = ["0m", "15m", "30m", "45m"];
    }

    start() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear(($dialog) => {
            const logTimeInput = $dialog[0].querySelector("#log-work-time-logged");
            const featureContainer = document.createElement("reportj-log-time");
            insertAfter(featureContainer, logTimeInput);

            render(<TimeSelector hours={this.hours} minutes={this.minutes} onSubmit={(time) => this.setLogTimeToJira(time)} />,
                featureContainer);
        });
    }

    setLogTimeToJira(time) {
        const timeInput = document.getElementById("log-work-time-logged");
        timeInput.value = time
    }
}