import React from "react";

const Verify = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200 overflow-hidden">
      <div className="bg-green-900 text-center text-gray-100 px-8 py-6 rounded-2xl shadow-lg w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%]">
        <h2 className="text-2xl font-semibold">✅ Check Your Email</h2>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          A verification link has been sent to your email. <br />
          Please check your inbox and click the link to verify your account.
        </p>
      </div>
    </div>
  );
};

export default Verify;
