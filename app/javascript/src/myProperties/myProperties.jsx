import React, { useState, useEffect } from "react";
import UserProperties from "./userProperties";
import Layout from "../layout";
import AddPropertyButton from "./addPropertyButton";
import { safeCredentials, handleErrors, authenticityHeader } from "@utils/fetchHelper";
import "./myProperties.scss";

const MyProperties = () => {
    const [user_id, setUser_id] = useState({});
  
    useEffect(() => {
      fetch('/api/authenticated', authenticityHeader())
        .then(handleErrors)
        .then(data => {
          console.log('authenticated', data)
          setUser_id(data.user_id);
          console.log('user id', data.user_id);
        });
    }, []); 
  
    return (
      <Layout>
        <div className="container">
          <h1>My Properties</h1>
          <AddPropertyButton />
          <UserProperties user_id={user_id} />
        </div>
      </Layout>
    );
  }
  
  export default MyProperties;
  