import React from "react";
import { api } from "../../api";

export const HomePage = () => {
    const getId = async () => {
        const request = await api.get("/id");
        const response = request.data;
        console.log(response);
    };
    return (
        <div>
            HomePage
            <button onClick={getId}>click</button>
        </div>
    );
};
