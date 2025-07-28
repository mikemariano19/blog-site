'use client'

import { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Navbar from '../components/navbar/page'
import { useRouter } from 'next/navigation'

// Dynamically import UserPosts
const UserPosts = dynamic(() => import('../components/user-post/page'), {
  ssr: false,
})

type Profile = {
  firstName: string
  lastName: string
  about: string
}

  // Function to fetch data with retry logic for token refresh
  const fetchWithRetry = async (url: string, token: string) => {
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        // Token expired, try refresh
        const refreshRes = await axios.post('http://localhost:4001/api/refresh', {}, { withCredentials: true });
        const newToken = refreshRes.data.accessToken;
        localStorage.setItem('authToken', newToken);

        // Retry original request
        return await axios.get(url, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
      } else {
        throw err;
      }
    }
  };


const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const res = await fetchWithRetry('http://localhost:4001/api/profile', token || '');
        setProfile(res.data)
        setProfile(res.data)
      } catch (err: unknown) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile.')
      }
    }

    fetchProfile()
  }, [router])

  if (error) return <p className="text-red-500">{error}</p>
  if (!profile) return <p>Loading profile...</p>

  

  return (
        <>
        <Navbar />
          <div className="max-w-screen-md mx-auto mt-10 text-gray-800">
            <h1 className="text-2xl font-semibold mb-4">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="mb-4">{profile.about}</p>

            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <Suspense fallback={<p>Loading posts...</p>}>
              <UserPosts />
            </Suspense>
          </div>
        </>
  )
}


export default ProfilePage