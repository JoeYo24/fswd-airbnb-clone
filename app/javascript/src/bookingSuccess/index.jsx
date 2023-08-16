import React from "react";
import ReactDOM from "react-dom";
import BookingSuccess from "./bookingSuccess";

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <BookingSuccess />,
        document.body.appendChild(document.createElement("div"))
    );
});