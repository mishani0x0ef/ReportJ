import "./index.scss";
import "app/js/common/utils/axios.config";

import { Options } from "./options";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
    <Options />,
    document.getElementById("app")
);