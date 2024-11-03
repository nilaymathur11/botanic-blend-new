"use client";

import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const toggleForm = () => setIsLogin(!isLogin)
    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    return (
        <div className="flex flex-col">
            <main className="flex-1 bg-[#F5F5F5] pt-12">
                <div className="container mx-auto px-4 md:px-6 max-w-md">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 space-y-6">
                            <div className="text-center space-y-2">
                                <div className="text-2xl font-bold text-[#4d7c0f]">Welcome to Botanic Blend</div>
                                <p className="text-[#666666]">
                                    {isLogin ? "Login to your account" : "Create a new account"}
                                </p>
                            </div>

                            <div className="flex border-b border-[#4d7c0f]">
                                <button
                                    className={`flex-1 py-2 text-center ${isLogin ? 'text-[#4d7c0f] border-b-2 border-[#4d7c0f] font-semibold' : 'text-[#666666]'
                                        }`}
                                    onClick={() => setIsLogin(true)}
                                >
                                    Login
                                </button>
                                <button
                                    className={`flex-1 py-2 text-center ${!isLogin ? 'text-[#4d7c0f] border-b-2 border-[#4d7c0f] font-semibold' : 'text-[#666666]'
                                        }`}
                                    onClick={() => setIsLogin(false)}
                                >
                                    Register
                                </button>
                            </div>

                            <form className="space-y-4">
                                {!isLogin && (
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-[#666666]">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            className="w-full px-3 py-2 border border-[#4d7c0f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d7c0f]"
                                        />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-[#666666]">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        className="w-full px-3 py-2 border border-[#4d7c0f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d7c0f]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-[#666666]">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="w-full px-3 py-2 border border-[#4d7c0f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d7c0f]"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666] hover:text-[#4d7c0f]"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#4d7c0f] text-white py-2 rounded-md hover:bg-[#3d6c0f] transition-colors"
                                >
                                    {isLogin ? "Login" : "Create Account"}
                                </button>
                            </form>

                            <p className="text-center text-sm text-[#666666]">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button onClick={toggleForm} className="text-[#4d7c0f] hover:underline">
                                    {isLogin ? "Sign up" : "Log in"}
                                </button>
                            </p>

                            <p className="text-center text-xs text-[#666666] mt-4">
                                {"By continuing, you agree to Botanic Blend's Terms of Service and Privacy Policy."}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}