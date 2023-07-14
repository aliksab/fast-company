import React from "react";
import useMockData from "../utils/mockData";

const Home = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        console.log("click");
        initialize();
    };
    return (
        <div className="container mt-5">
            <h1>Home</h1>
            <h3>Инициализация данных в Firebase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>Инициализировать</button>
        </div>
    );
};

export default Home;
