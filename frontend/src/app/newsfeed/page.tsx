'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

import NewsFeed from '../components/newsfeed-post/page'
import InputPostPage from '../components/input-post/page'
import ProfileCreation from '../profile/create/page';

const NewsfeedPage = () => {
  const [firstName, setFirstName] = useState('');
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userRes = await axios.get('http://localhost:4001/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFirstName(userRes.data.firstName);

        // Check if user has a profile
        const profileRes = await axios.get('http://localhost:4001/api/profile/check', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasProfile(profileRes.data.hasProfile);
        console.log('User profile status:', profileRes.data.hasProfile);
      } catch (err) {
        console.error('Error fetching user/profile data:', err);
        setHasProfile(false);
      }
    };

    fetchUserData();
  }, []);


  return (
    <>
        {hasProfile === false ? (
        <ProfileCreation />
      ) : hasProfile === true ? (
        <>
          <InputPostPage firstName={firstName} />
          <NewsFeed />
        </>
      ) : null}
    </>
  )
}

export default NewsfeedPage