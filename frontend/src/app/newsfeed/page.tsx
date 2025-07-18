'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


import NewsFeed from '../components/newsfeed-post/page'
import InputPostPage from '../components/input-post/page'
import Navbar from '../components/navbar/page';

const NewsfeedPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const router = useRouter();

  if(!localStorage.getItem('authToken')) {
    router.push('/login'); // Redirect to login if no token
  }

 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) return; // If no token, do not proceed

      try {
        const userRes = await axios.get('http://localhost:4001/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFirstName(userRes.data.firstName);
        setLastName(userRes.data.lastName);

        console.log('Token:', token); // See if it's null or correct

        
      } catch (err) {
        console.error('Error fetching user/profile data:', err);
      }
    };

    fetchUserData();
  }, []);


  return (
    <>
        <Navbar />
        <InputPostPage 
          firstName={firstName || 'User'} 
          lastName={lastName || 'User'} 
        />
        <NewsFeed />
    </>
  )
}

export default NewsfeedPage