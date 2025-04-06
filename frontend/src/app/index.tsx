'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsFeed from './components/newsfeed/page';
import Navbar from './components/navbar/page';

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
            <Navbar />
            <NewsFeed />
        </div>
    );
};

export default HomePage;