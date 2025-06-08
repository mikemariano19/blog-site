'use client'
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { HomeIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/navigation";
import axios from 'axios';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Replace 'authToken' with your token key
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    


    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove the token
        localStorage.removeItem('isLoggedIn'); // Remove login status
        setIsLoggedIn(false)
        router.push('/login'); // Redirect to login page
        console.log('Logged out');
    }

    const handleProfile = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get('http://localhost:4001/api/profile/check', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.data.hasProfile) {
                router.push('/profile'); // Redirect to profile page
            } else {
                router.push('/profile/create'); // Redirect to profile creation page
            }
        } catch (error) {
            console.error('Error checking profile:', error);
        }
    };



    return (
        <div className="text-slate-200 w-full bg-slate-800">
            <div className="max-w-screen-lg flex justify-between mx-auto">
                <div className="h-12 content-center max-w-screen-lg">
                    <h1 className="text-2xl flex items-center">DEV_PH</h1>
                </div>
                {isLoggedIn ?
                    <div className="h-12 flex content-center">
                    <Link href="/" className="p-3 flex">
                        <HomeIcon className="size-6" />
                        <span className="px-1 hidden lg:block">Home</span>
                    </Link>
                    <button onClick={handleProfile} className='p-3 flex'>
                            <UserCircleIcon className="size-6" />
                            <span className="px-1 hidden lg:block">Profile</span>
                    </button>
                    <button onClick={handleLogout} className="p-3 flex">
                        <UserIcon className="size-6" />
                        <span className="px-1 hidden lg:block">Log Out</span>
                    </button>
                </div> : null 
            }
            </div>
        </div>
    )
}

export default Navbar;