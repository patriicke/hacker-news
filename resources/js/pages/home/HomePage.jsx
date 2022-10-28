import React from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import { signout } from "./../../redux/slices/userSlice";
export const HomePage = () => {
    const dispatch = useDispatch();
    return (
        <div>
            HomePage
            <button onClick={() => dispatch(signout())} className="bg-red-500 text-white p-1 m-1 rounded-md">Logout</button>
        </div>
    );
};
