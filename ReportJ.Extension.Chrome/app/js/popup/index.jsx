import "bootstrap";
import "~/css/main.css";
import "~/css/animation.css";
import "~/css/bootstrap.paper.css";

import { Popup } from "./components/popup/popup";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
    <Popup />,
    document.getElementById("app")
);