import React, { useState, useEffect } from "react";
import Layout from "../layout";
import UserBookings from "./userBookings";
import { safeCredentials, handleErrors, authenticityHeader } from "@utils/fetchHelper";

const MyBookings = () => { 
    const [user_id, setUser_id] = useState({});

    useEffect(() => {
        fetch('/api/authenticated', authenticityHeader())
        .then(handleErrors)
        .then(data => {
            console.log('authenticated', data.user_id)
            setUser_id(data.user_id)
            console.log('user id', data.user_id)
        })
    }, []);

    return (
        <Layout>
            <div className="container">
                <h1>My Bookings</h1>
                <UserBookings user_id={user_id} />
            </div>
        </Layout>
    )
}

export default MyBookings;
