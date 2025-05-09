'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsFeed from './components/newsfeed-post/page';

const HomePage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        } else {
            router.push('/login'); // Redirect to login if not logged in
        }
    }, [router]);

    if (!isLoggedIn) {
        return null; // Prevent rendering until the login status is checked
    }

    return (
        <div>
            <NewsFeed />
        </div>
    );
};

export default HomePage;