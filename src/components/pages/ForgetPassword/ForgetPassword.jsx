import React, { useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const api_url = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [isExist, setIsExist] = useState(false);
    const navigate = useNavigate();
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value.replace(/[^0-9]/g, "");
        setOtp(updatedOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return toast.error("Please enter your email!");
        try {
            setLoading(true);
            const res = await axios.post(`${api_url}/users/user/password/forget`, {
                email,
            });
            toast.success(res.data.message || "OTP sent to your email!");
            setIsExist(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Account not found!");
        } finally {
            setLoading(false);
        };
    };

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        if (otp.some((digit) => digit === "")) {
            return toast.error("Please enter the full OTP!");
        };
        const otpCode = otp.join("");
        try {
            setLoading(true);
            const res = await axios.post(`${api_url}/users/user/otp/verify/${email}`, {
                otp: otpCode,
            });
            toast.success(res.data.message || "OTP Verified!");
            setOtp(["", "", "", "", "", ""]);
            setTimeout(() => {
                navigate(`/user/password-reset/${email}`);
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP!");
        } finally {
            setLoading(false);
        };
    };

    const handleReSend = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${api_url}/users/user/re-send/otp/${email}`);
            toast.success(res.data.message || "OTP resent successfully!");
            setOtp(["", "", "", "", "", ""]);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP!");
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-2">🔐 Forgot Your Password?</h2>
                <p className="text-white/80 text-sm mb-6">
                    {isExist
                        ? "Enter the 6-digit OTP sent to your email."
                        : "Enter your registered email address to find your account."}
                </p>
                <form
                    onSubmit={isExist ? handleOtpVerify : handleSubmit}
                    className="space-y-5"
                >
                    {!isExist && (
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-transparent focus:ring-2 focus:ring-gray-400 focus:outline-none placeholder-gray-400 text-white"
                        />
                    )}
                    {isExist && (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex justify-center gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={digit}
                                        maxLength={1}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        className="w-10 h-10 text-center text-lg font-bold border border-gray-500 rounded-lg bg-transparent focus:ring-2 focus:ring-gray-400 outline-none text-white"
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={handleReSend}
                                className="text-sm text-gray-300 hover:underline"
                            >
                                Resend OTP
                            </button>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg font-semibold text-white transition-all duration-300 ${loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-gray-800 hover:bg-gray-900"
                            }`}
                    >
                        {loading
                            ? "Processing..."
                            : isExist
                                ? "Verify OTP"
                                : "Find Account"}
                    </button>
                </form>
                <p className="mt-6 text-sm text-white/80">
                    Remember your password?{" "}
                    <Link
                        to="/user/login"
                        className="text-gray-300 font-semibold hover:underline"
                    >
                        Go back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgetPassword;
