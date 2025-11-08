import { setUser } from "@/redux/userSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    const disPatch = useDispatch();
    const api_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [fromData, setFromData] = useState({
        email: "",
        password: ""
    });
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFromData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api_url}/users/user/login`, fromData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success(response.data.message);
            disPatch(setUser(response.data.result));
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error)
        };
    };
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
            <form onSubmit={onSubmit}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white"
            >
                <h2 className="text-3xl font-bold text-center mb-6">Login Account</h2>

                <div className="flex flex-col space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={fromData.email}
                        onChange={handleOnChange}
                        placeholder="Email Address"
                        required
                        className="px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleOnChange}
                        value={fromData.password}
                        placeholder="Password"
                        required
                        className="px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                    />
                    <Link
                        to={'/user/password-forget'}
                        className="text-left w-[120px] py-0 hover:text-blue-400"
                    >
                        Forget Password
                    </Link>
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-pink-500 hover:bg-pink-600 transition-all text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-pink-500/40"
                >
                    Login
                </button>

                <p className="text-center text-sm text-white/70 mt-4">
                    No have an account?{" "}
                    <Link
                        to={"/user/register"}
                        className="text-pink-600 hover:underline hover:text-pink-500 transition-all"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
