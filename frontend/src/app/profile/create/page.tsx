'use client';

import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const ProfileCreation: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            setError('Only JPG, PNG, or WEBP images are allowed.');
            setAvatar(null);
            setAvatarPreview(null);
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setError('Image must be less than 2MB.');
            setAvatar(null);
            setAvatarPreview(null);
            return;
        }

        setError('');
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim()) {
            setError('Both first name and last name are required.');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            if (avatar) {
                formData.append('avatar', avatar);
            }

            const response = await axios.post(
                'http://localhost:4001/api/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                alert('Profile created successfully!');
                router.push('/newsfeed'); // Redirect to newsfeed after successful profile creation
            }
            
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'An error occurred. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/');
    };

    useEffect(() => {
    const checkIfProfileExists = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const res = await axios.get('http://localhost:4001/api/profile/check', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.hasProfile) {
          router.replace('/newsfeed'); // If profile exists, redirect to newsfeed
        }
      } catch (err) {
        console.error('Failed to verify profile status:', err);
        router.push('/profile/create');
      }
    };

    checkIfProfileExists();
  }, [router]);

    return (
        <>
                <div className="max-w-screen-md px-4 mx-auto mt-10 text-slate-900">
                <h1 className="text-2xl font-semibold mb-4">Create Your Profile</h1>
                <form onSubmit={handleProfileSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4 flex flex-col items-center">
                        <label className="block text-gray-700 font-medium mb-2">
                            Avatar
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="mb-2" 
                            disabled={loading}
                        />
                        {avatarPreview && (
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="w-24 h-24 rounded-full object-cover border"
                            />
                        )}
                    </div>
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
                            disabled={loading}
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
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProfileCreation;