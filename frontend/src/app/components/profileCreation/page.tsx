'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfileCreationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [about, setAbout] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            await axios.put(
                'http://localhost:4001/api/profile',
                { firstName, lastName, about },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert('Profile created successfully!');
            router.push('/profile'); // Redirect to profile page
        } catch (error) {
            console.error('Error creating profile:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-screen-md mx-auto mt-10">
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
                <div className="mb-4">
                    <label htmlFor="about" className="block text-gray-700 font-medium mb-2">
                        About
                    </label>
                    <textarea
                        id="about"
                        className="border p-2 rounded-lg w-full"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        rows={4}
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

export default ProfileCreationPage;