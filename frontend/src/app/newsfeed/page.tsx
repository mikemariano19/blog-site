'use client'

import Navbar from '../components/navbar/page'
import NewsFeed from '../components/newsfeed-post/page'
import InputPostPage from '../components/input-post/page'
import { useState, useEffect } from 'react';
import axios from 'axios';

const NewsfeedPage = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Simulate fetching the user's first name from an API
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setFirstName(response.data.firstName); // Assuming the API returns `firstName`
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);


  return (
    <>
        <Navbar />
        <InputPostPage firstName={firstName} />
        <NewsFeed />
    </>
  )
}

export default NewsfeedPage