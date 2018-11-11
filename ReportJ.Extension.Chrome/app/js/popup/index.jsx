import "./index.scss";
import "app/js/common/utils/axios.config";

import { Popup } from "./components/popup/popup";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
    <Popup />,
    document.getElementById("app")
);