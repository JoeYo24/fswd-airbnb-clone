import React from "react";

const AddPropertyButton = (props) => {
    const handleClick = () => {
        console.log('add property button clicked')
        window.location.href = '/my_properties/new'
    }
    return (
        <div className="container">
            <button className="btn btn-primary" onClick={handleClick}>Add Property</button>
        </div>
    )
}

export default AddPropertyButton;