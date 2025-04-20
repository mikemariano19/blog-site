'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfileCreation: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim()) {
            setError('Both first name and last name are required.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
            const response = await axios.post(
                'http://localhost:4001/api/profile',
                { firstName, lastName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert('Profile created successfully!');
                router.push('/newsfeed'); // Redirect to the newsfeed
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'An error occurred. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="max-w-screen-md px-4 mx-auto mt-10 text-slate-900">
            <h1 className="text-2xl font-semibold mb-4">Create Your Profile</h1>
            <form onSubmit={handleProfileSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        className="border p-2 rounded-lg w-full"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        className="border p-2 rounded-lg w-full"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileCreation;