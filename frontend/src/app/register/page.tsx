'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your registration logic here
        try {
            const response = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Registration successful
                alert(`Account created successfully for ${username}`);
                router.push('/login'); // Redirect to the login page
            } else {
                // Registration failed
                setError(data.message);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An error occurred. Please try again.');
        }
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
                            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error */}
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