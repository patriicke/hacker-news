import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { api } from "./../../api";
import { useDispatch } from "react-redux";
import { signin } from "./../../redux/slices/userSlice";
const Signup = () => {
    const [togglePassword, setTogglePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [invalidP, setInvalidP] = useState(false);
    const dispatch = useDispatch();
    const handleSignup = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            if (cpassword != password) return setInvalidP(true);
            const request = await api.post("/user", {
                fullname,
                email,
                password,
                cpassword,
            });
            const response = request.data;
            dispatch(signin({...response}));
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
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
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        type="text"
                        className=" border-[1px] border-white outline-none p-[8px] bg-transparent w-full rounded-md px-2 text-sm text-gray-300 focus:border-blue-400"
                        placeholder="Your name"
                        required
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
                        required
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
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-md text-gray-300 pb-2 mt-4">
                            Confirm Password
                        </label>
                        <input
                            value={cpassword}
                            onChange={(e) => {
                                setCpassword(e.target.value);
                                setInvalidP(false);
                            }}
                            type={`${togglePassword ? "text" : "password"}`}
                            className=" border-[1px] border-gray-300 outline-none p-[8px] bg-transparent w-full rounded-md px-2 text-gray-300 text-sm focus:border-blue-400"
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                    {invalidP && (
                        <p className="text-sm text-red-400 mt-2 text-center">
                            Passwords don't match!
                        </p>
                    )}
                    {error && (
                        <p className="text-sm text-red-400 mt-2 text-center">
                            Try using valid credentials. Or Login if you have an
                            account!
                        </p>
                    )}
                    <button
                        type="submit"
                        className={`bg-[#0075ff] text-gray-300 w-full p-2 rounded-md mt-5 text-sm`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading" : "Create account"}
                    </button>
                    <p className="text-white text-sm text-center mt-3">
                        Already joined?{" "}
                        <Link to="/auth/login" className="text-blue-400">
                            login now
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
