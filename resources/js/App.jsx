import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { HomePage } from "./pages/home/HomePage";
const App = () => {
    const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <HomePage />
                        ) : (
                            <Navigate to={"/auth/login"} />
                        )
                    }
                />
                <Route
                    path="/auth/login"
                    element={!isLoggedIn ? <Login /> : <Navigate to={"/"} />}
                />
                <Route
                    path="/auth/signup"
                    element={!isLoggedIn ? <Signup /> : <Navigate to={"/"} />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
