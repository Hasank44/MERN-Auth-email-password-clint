import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import axios from "axios";

const VerifyEmail = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying...");
  const [isFailed, setIsFailed] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        `${api_url}/users/user/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        setStatus("✅ Email Verified Successfully!");
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/user/login");
        }, 2000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed!");
      setStatus("❌ Email Verification Failed");
      setIsFailed(true);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const reVerify = async () => {
    if (!email) {
        toast.error("Please enter your email!")
    };
    try {
      const res = await axios.post(`${api_url}/users/user/reverify`, {
        email,
      });
      toast.success(res.data.message || "Verification email sent again!");
      setStatus("📩 Verification email sent!");
      setShowInput(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend email");
    };
  };

  return (
    <div className="w-full h-[760px] bg-gray-200 flex items-center justify-center">
      <div className="w-[90%] max-w-md bg-white rounded-xl text-center shadow-md p-5">
        <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
        {isFailed && (
          <button
            onClick={() => setShowInput(!showInput)}
            className="px-4 py-2 bg-gray-700 text-gray-100 rounded-md cursor-pointer mt-5 hover:bg-gray-800"
          >
            Reverify
          </button>
        )}
        {showInput && (
          <div className="mt-4 flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-400 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-700"
            />
            <button
              onClick={reVerify}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send Verification Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;