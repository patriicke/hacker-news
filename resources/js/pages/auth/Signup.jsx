import React, { useState } from "react";
import logo from "../../assets/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Signup = () => {
    const navigate = useNavigate();
    const [togglePassword, setTogglePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [names, setNames] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignup = (e) => {
        e.preventDefault();
    };
    return (
        <div
            className={`w-screen h-screen bg-[#001833] flex items-center relative justify-center flex-col`}
        >
            <img src={logo} alt="logo" className="w-24 h-24 rounded-full" />
            <div className="w-[600px] px-12 py-8 bg-[#072F5F] rounded-lg  scale-95">
                <h2 className="text-gray-300 font-medium text-lg  pb-4 text-center">
                    Create new account
                </h2>
                <form
                    onSubmit={(e) => handleSignup(e)}
                    action="#"
                    className={`${
                        isLoading ? "pointer-events-none opacity-60" : ""
                    }`}
                >
                    <label className="block text-md text-gray-300 pb-2">
                        Full name
                    </label>
                    <input
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                        type="text"
                        className=" border-[1px] border-white outline-none p-[8px] bg-transparent w-full rounded-md px-2 text-sm text-gray-300 focus:border-blue-400"
                        placeholder="Your name"
                    />
                    <label className="block text-md text-gray-300 pb-2 mt-4">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className=" border-[1px] border-white outline-none p-[8px] bg-transparent w-full rounded-md px-2 text-gray-300 text-sm focus:border-blue-400"
                        placeholder="Your email address"
                    />
                    <div className="relative">
                        <label className="block text-md text-gray-300 pb-2 mt-4">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={`${togglePassword ? "text" : "password"}`}
                            className=" border-[1px] border-gray-300 outline-none p-[8px] bg-transparent w-full rounded-md px-2 text-gray-300 text-sm focus:border-blue-400"
                            placeholder="Choose password"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-md text-gray-300 pb-2 mt-4">
                            Confirm Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={`${togglePassword ? "text" : "password"}`}
                            className=" border-[1px] border-gray-300 outline-none p-[8px] bg-transparent w-full rounded-md px-2 text-gray-300 text-sm focus:border-blue-400"
                            placeholder="Confirm password"
                        />
                    </div>
                    <p className="text-sm text-red-400 mt-2 text-center">
                        {error}
                    </p>
                    <button
                        type="submit"
                        className={`bg-[#0075ff] text-gray-300 w-full p-2 rounded-md mt-5 text-sm`}
                    >
                        Create account
                    </button>
                    <p className="text-white text-sm text-center mt-3">
                        Already joined?{" "}
                        <Link to="/auth/login" className="text-blue-400">
                            login now
                        </Link>
                    </p>
                </form>
                {isLoading && (
                    <div className="absolute z-10 top-1/2 left-[42%]">
                        <ThreeCircles
                            width={100}
                            height={100}
                            color="#0075FF"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
