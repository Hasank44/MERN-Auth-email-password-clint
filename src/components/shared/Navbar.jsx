import React, { useState, useRef, useEffect } from "react";
import { Toaster } from "../ui/sonner";
import { Link, useNavigate } from "react-router";
import { MdMenu, MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import { BookA, BookOpen, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const disPatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
  const { user } = useSelector(store => store.user);
  const api_url = import.meta.env.VITE_API_URL;

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${api_url}/users/user/logout`,{},
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      toast.success(res.data.message || "Log out success!");
      disPatch(setUser(null));
        localStorage.clear();
        navigate("/user/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      <nav className="w-full fixed top-0 z-50 bg-gray-900/95 backdrop-blur-md text-gray-100 shadow-lg shadow-black/30 border-b border-gray-800 px-5">
        <div className="max-w-7xl mx-auto h-12 flex items-center justify-between container">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-500" />
            <h1 className="font-bold text-xl">
              <span className="text-green-500">Notes</span>App
            </h1>
          </Link>
          <ul className="hidden sm:flex gap-8 items-center font-semibold text-gray-200">
            <li className="hover:text-green-400 cursor-pointer">Features</li>
            <li className="hover:text-green-400 cursor-pointer">Pricing</li>
            <li className="hover:text-green-400 cursor-pointer">About</li>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <Avatar className="cursor-pointer ring-2 ring-green-500 hover:ring-green-400 transition">
                    <AvatarImage src="https://github.com/sadcn.png" alt="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-lg text-gray-200 py-2 animate-in fade-in">
                    <div className="px-4 py-2 font-semibold border-b border-gray-700">
                      My Account
                    </div>
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700"
                      onClick={() => navigate("/profile")}
                    >
                      <User className="w-4" /> Profile
                    </button>
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700"
                      onClick={() => navigate("/notes")}
                    >
                      <BookA className="w-4" /> Notes
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-600/30"
                    >
                      <LogOut className="w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/user/login"
                className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold"
              >
                Login
              </Link>
            )}
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-3xl focus:outline-none"
          >
            {isOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        {isOpen && (
          <div className="sm:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
            <ul className="flex flex-col gap-4 items-center py-4 font-medium text-gray-300">
              <li className="hover:text-green-400 cursor-pointer">Features</li>
              <li className="hover:text-green-400 cursor-pointer">Pricing</li>
              <li className="hover:text-green-400 cursor-pointer">About</li>

              {user ? (
                <>
                  <li
                    onClick={() => navigate("/profile")}
                    className="hover:text-green-400 cursor-pointer flex gap-2 items-center"
                  >
                    <User className="w-4" /> Profile
                  </li>
                  <li
                    onClick={() => navigate("/notes")}
                    className="hover:text-green-400 cursor-pointer flex gap-2 items-center"
                  >
                    <BookA className="w-4" /> Notes
                  </li>
                  <li
                    onClick={logoutHandler}
                    className="text-red-400 hover:text-red-500 cursor-pointer flex gap-2 items-center"
                  >
                    <LogOut className="w-4" /> Logout
                  </li>
                </>
              ) : (
                <Link
                  to="/user/login"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold"
                >
                  Login
                </Link>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;