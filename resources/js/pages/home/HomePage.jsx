import React from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import { signout } from "./../../redux/slices/userSlice";
export const HomePage = () => {
    const dispatch = useDispatch();
    return (
        <div>
            HomePage
            <button onClick={() => dispatch(signout())}>signout</button>
        </div>
    );
};
