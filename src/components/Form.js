import React from "react";

export default function Form(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <h3>Add a new activity to the log</h3>
            <label htmlFor="description">Description</label>
            <input
                type="text"
                id="description"
                value={props.formInputs.description}
                onChange={props.handleChange}
            />
            <label htmlFor="gener">Hours Spent</label>
            <input
                type="text"
                id="time_spent"
                value={props.formInputs.time_spent}
                onChange={props.handleChange}
            />
            <input type="submit" className="submit" />
        </form>
    );
}
