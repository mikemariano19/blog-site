'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your registration logic here
        console.log('Username:', username);
        console.log('Password:', password);
        alert(`Account created successfully for ${username}`);
        // Redirect to the login page after successful registration
        router.push('/login');
    };

    return (
        <div className="register-container text-slate-900 text-lg flex justify-center items-center h-screen">
            <div className="border bg-white rounded-lg shadow-lg">
                <div className="w-96">
                    <h1 className="text-center py-4 font-semibold text-xl text-slate-800">
                        Create New Account
                    </h1>
                    <div className="border-t"></div>
                    <div className="w-full p-4 pb-0">
                        <form onSubmit={handleRegister} className="register-form">
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
                                Register
                            </button>
                            <div className="text-right mt-2">
                                <button className="py-4 text-center text-blue-500">
                                    <a href="/login">Already have an account? Login</a>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;