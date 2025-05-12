'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4001/api/login', {
                userName: username,
                password: password,
            });
            

            if (response.data.token) {
                // Save the token in localStorage
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('isLoggedIn', 'true'); // Optional: Track login status
                // Login successful
                alert(`Welcome back, ${username}`);
                router.push('/newsfeed'); // Redirect to the newsfeed page
                console.log('Login successful:', response.data);
            } else {
                console.error('No token received from the server');
            }
        } catch (err: unknown) {
            // Narrow the type of `err` to handle it properly
            if (axios.isAxiosError(err)) {
                // console.error('Login error:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Invalid username or password.');
            } else {
                console.error('Unexpected error:', err);
                setError('An unexpected error occurred. Please try again.');
            }
            // Automatically clear the error message after 5 seconds
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    

    return (
        <div className="login-container text-slate-900 text-lg flex justify-center items-center h-screen">
            <div className="border bg-white rounded-lg shadow-lg">
                <div className="w-96">
                    <h1 className="text-center py-4 font-semibold text-xl text-slate-800">
                        Login into Pethub
                    </h1>
                    <div className="border-t"></div> {/* border */}
                    <div className="relative py-2 pl-4">
                        <p
                            className={`absolute text-red-500 text-sm ${error ? 'block' : 'hidden'}`}
                        >
                            {error}
                        </p>
                    </div>
                    <div className="w-full p-4 pb-0">
                        <form onSubmit={handleLogin} className="login-form">
                            <div className="mb-2">
                                <input
                                    placeholder="Username"
                                    className="border p-2 rounded-lg w-full"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <input
                                placeholder="Password"
                                className="border p-2 rounded-lg w-full"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-slate-800 w-full text-white text-center p-2 rounded-lg mt-4"
                            >
                                Login
                            </button>
                            <div className="text-right mt-2">
                                <button className="py-4 text-center text-blue-500">
                                    <a href="/forgot-password">Forgot Password?</a>
                                </button>
                                <div className="border-t"></div>
                                <a
                                    href="/register"
                                    className="bg-blue-500 my-6 px-2 py-3 rounded-lg text-white w-full text-center block"
                                >
                                    Create new account
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;