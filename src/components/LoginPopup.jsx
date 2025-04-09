import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPopup = () => {

    const modalRef = useRef(null);
    const navigate=useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                navigate("/");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 backdrop-blur-sm z-50"
        >
            <motion.div
                ref={modalRef}
                initial={{ y: -20, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-slate-700 rounded-2xl p-8 text-white text-center shadow-2xl max-w-sm w-full relative overflow-hidden"
            >
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>

                <div className="relative z-10">
                    <div className="mb-6 flex justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-12 h-12 text-purple-400"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        Welcome Back
                    </h2>

                    <p className="text-slate-300 mb-6">
                        Login or sign up to access all features and personalize your experience.
                    </p>

                    <div className="space-y-4">
                        <Link to="/login" className="w-full block">
                            <Button
                                className="w-full py-6 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/20"
                            >
                                Login
                            </Button>
                        </Link>

                        <p className="text-slate-400 text-sm">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LoginPopup;