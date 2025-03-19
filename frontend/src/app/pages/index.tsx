'use client'

import React, { useEffect, useState } from 'react';
import UserPost from '../components/user-post/page';
import LoginPage from './login';
import InputPostPage from '../components/input-post/page';

const HomePage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
    }, []);

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <InputPostPage />
                    <UserPost />
                </>
            ) : (
                <LoginPage />
            )}
        </div>
    );
};

export default HomePage;