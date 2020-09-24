import React, { useState, useEffect } from "react";
import BarChart from "./components/BarChart.js";
import Form from "./components/Form";
import "./App.css";

function App() {
    const [activities, setActivities] = useState([]);
    const [formInputs, updateFormInputs] = useState({
        description: "",
        time_spent: "",
    });

    const handleChange = (event) => {
        const updateInput = Object.assign({}, formInputs, {
            [event.target.id]: event.target.value,
        });
        updateFormInputs(updateInput);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                "https://arete-time-tracker-backend.herokuapp.com/activities/",
                {
                    body: JSON.stringify(formInputs),
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            updateFormInputs({
                description: "",
                time_spent: "",
            });
            setActivities([data, ...activities]);
        } catch (error) {
            console.error(error);
        }
    };
    const getActivities = async () => {
        try {
            const response = await fetch(
                "https://arete-time-tracker-backend.herokuapp.com/activities/"
            );
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        (async function () {
            await getActivities();
        })();
    }, []);
    return (
        <div className="App">
            <BarChart />
            <Form
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formInputs={formInputs}
            />
        </div>
    );
}

export default App;
