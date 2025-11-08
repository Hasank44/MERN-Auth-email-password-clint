import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm sm:text-base text-center sm:text-left">
          &copy; Hasan {new Date().getFullYear()} All rights reserved
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a href="mailto:mdhasan.sjb@gmail.com"
          className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
