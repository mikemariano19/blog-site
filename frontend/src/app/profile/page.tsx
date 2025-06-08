'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';


type Profile = {
    firstName: string;
    lastName: string;
    about: string;
};

type Post = {
    _id: string;
    content: string;
    createdAt: string;
};

const ProfilePage = () => {
    const [profile, setProfile] = useState<Profile | null>(null); // Profile can be null initially
    const [posts, setPosts] = useState<Post[]>([]); // Posts is an array of Post objects
    const [error, setError] = useState('');
    const [postsLoading, setPostsLoading] = useState(true);
    

    useEffect(() => {
        const fetchProfileAndPosts = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const profileResponse = await axios.get('http://localhost:4001/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfile(profileResponse.data);

                setPostsLoading(true);
                const postsResponse = await axios.get('http://localhost:4001/api/posts/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfile(profileResponse.data);
                setPosts(postsResponse.data);
            } catch (error) {
                console.error('Error fetching profile or posts:', error);
                setError('An error occurred. Please try again.');
            }
        };

        fetchProfileAndPosts();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-screen-md mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-4">{profile.firstName} {profile.lastName}</h1>
            <p className="mb-4">{profile.about}</p>
            <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
            {postsLoading ? (
                <p>Loading posts...</p>
            ) : posts.length === 0 ? (
                <p className="text-gray-500">No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="border p-4 rounded-lg mb-4">
                        <p>{post.content}</p>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProfilePage;