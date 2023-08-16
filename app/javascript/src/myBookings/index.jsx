import React from "react";  
import ReactDOM  from "react-dom";
import MyBookings from "./myBookings";

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <MyBookings />,
        document.body.appendChild(document.createElement("div")),
    )
});