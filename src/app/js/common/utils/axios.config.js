import axios from "axios";

(function () {
    axios.defaults.headers.put["Content-Type"] = "application/json";
    axios.interceptors.response.use((response) => {
        return response.data;
    });
}());