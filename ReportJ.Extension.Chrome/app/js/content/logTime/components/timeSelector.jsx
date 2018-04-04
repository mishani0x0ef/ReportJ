import React, { Component } from "react";
import { classIf } from "~/js/content/common/reactUtil";
import { SquareCheckBoxGroup } from "./squareCheckBoxGroup";

export class TimeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopupVisible: false,
        };

        this.selectedHours = null;
        this.selectedMinutes = null;
    }

    get selectedTime() {
        const hours = this.selectedHours || "";
        const minutes = this.selectedMinutes || "";
        let logTime = `${hours} ${minutes}`;
        return logTime.trim();
    }

    showPopup() {
        this.setState({ isPopupVisible: true });
    }

    closePopup() {
        this.setState({ isPopupVisible: false });
    }

    onHoursChange(hours) {
        this.selectedHours = hours;
    }

    onMinutesChange(minutes) {
        this.selectedMinutes = minutes;
    }

    submitChanges() {
        if (typeof this.props.onSubmit === "function") {
            this.props.onSubmit(this.selectedTime);
        }
        this.closePopup();
    }

    render() {
        return (
            <div className="time-selector">
                <span className="reportj-link" title="Use ReportJ to set time" onClick={() => this.showPopup()}></span>
                <div className={`log-work-popup ${classIf(this.state.isPopupVisible, "active")}`}>
                    <SquareCheckBoxGroup group="Hours" values={this.props.hours} onChange={(e) => this.onHoursChange(e)} />
                    <SquareCheckBoxGroup group="Minutes" values={this.props.minutes} onChange={(e) => this.onMinutesChange(e)} />
                    <div className="popup-section buttons-section">
                        <span className="product-placement">Powered by ReportJ</span>
                        <input type="button" className="aui-button" value="OK" onClick={() => this.submitChanges()} />
                        <a className="aui-button aui-button-link cancel" onClick={() => this.closePopup()}>Cancel</a>
                    </div>
                </div>
            </div>
        );
    }
}