import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const SetNewPassword = () => {
    const api_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const { email } = useParams();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { newPassword, confirmPassword } = formData;
        if (!email) return toast.error("Invalid request — email missing!");
        if (!newPassword || !confirmPassword)
            return toast.error("Please fill all fields!");
        if (newPassword.length < 8)
            return toast.error("Password must be at least 8 characters!");
        if (newPassword !== confirmPassword)
            return toast.error("Passwords do not match!");

        try {
            setLoading(true);
            const res = await axios.post(`${api_url}/users/user/change/password/${email}`, {
                newPassword,
                confirmPassword
            });
            toast.success(res.data.message || "Password reset successful!");
            setTimeout(() => {
                setFormData({ newPassword: "", confirmPassword: "" });
                navigate("/user/login");
            }, 1500);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Password reset failed. Try again!"
            );
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold text-white mb-2">
                    🔑 Set New Password
                </h2>
                <p className="text-white/80 text-sm mb-6">
                    Enter your new password below to reset your account.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New password"
                        className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-transparent focus:ring-2 focus:ring-gray-400 focus:outline-none placeholder-gray-400 text-white"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-transparent focus:ring-2 focus:ring-gray-400 focus:outline-none placeholder-gray-400 text-white"
                    />
                    <button
                        type="button"
                        onClick={() => navigate('/user/password-forget')}
                        className="text-sm text-gray-300 hover:underline"
                    >
                        Resend OTP
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg font-semibold text-white transition-all duration-300 ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-gray-800 hover:bg-gray-900"
                            }`}
                    >
                        {loading ? "Processing..." : "Reset Password"}
                    </button>
                </form>
                <p className="mt-6 text-sm text-white/80">
                    Remembered your password?{" "}
                    <a
                        href="/user/login"
                        className="text-gray-300 font-semibold hover:underline"
                    >
                        Go back to Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SetNewPassword;
