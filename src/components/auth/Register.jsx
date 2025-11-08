import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router'
import { toast } from "sonner";

const Register = () => {
    const api_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [fromData, setFromData] = useState({
        userName: "",
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
            const response = await axios.post(`${api_url}/users/user/register`, fromData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success(response.data.message)
            setTimeout(() => {
                navigate('/user/verify');
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error)
        };
    };
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
            <form onSubmit={onSubmit}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white"
            >
                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="User Name"
                        name="userName"
                        onChange={handleOnChange}
                        value={fromData.userName}
                        required
                        className="px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                    />
                    <input
                        type="email"
                        name="email"
                        onChange={handleOnChange}
                        value={fromData.email}
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
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-pink-500 hover:bg-pink-600 transition-all text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-pink-500/40"
                >
                    Register
                </button>
                <p className="text-center text-sm text-white/70 mt-4">
                    Already have an account?{" "}
                    <Link
                        to={"/user/login"}
                        className="text-pink-600 hover:underline hover:text-pink-500 transition-all"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
