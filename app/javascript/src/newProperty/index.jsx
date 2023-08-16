import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import NewPropertyForm from "./newPropertyForm";

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Layout>
            <NewPropertyForm />
        </Layout>,
        document.body.appendChild(document.createElement("div"))
    );
});