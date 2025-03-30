'use client';

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
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                alert(`Logged in successfully as ${username}`);
                localStorage.setItem('isLoggedIn', 'true'); // Set login status
                router.push('/'); // Redirect to the home page
            } else {
                // Login failed
                setError(data.message);
            }
        } catch {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container text-slate-900 text-lg flex justify-center items-center h-screen">
            <div className="border bg-white rounded-lg shadow-lg">
                <div className="w-96">
                    <h1 className="text-center py-4 font-semibold text-xl text-slate-800">
                        Login into Pethub
                    </h1>
                    <div className="border-t"></div>
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
                            {error && <p className="text-red-500 text-sm">{error}</p>}
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
                                <button className="bg-blue-500 my-6 px-2 py-3 rounded-lg text-white w-full text-center">
                                    <a href="/register">Create new account</a>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;