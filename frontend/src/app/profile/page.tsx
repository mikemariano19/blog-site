'use client'

import { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'

// Dynamically import UserPosts
const UserPosts = dynamic(() => import('../components/user-post/page'), {
  ssr: false,
})

type Profile = {
  firstName: string
  lastName: string
  about: string
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const res = await axios.get('http://localhost:4001/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProfile(res.data)
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile.')
      }
    }

    fetchProfile()
  }, [])

  if (error) return <p className="text-red-500">{error}</p>
  if (!profile) return <p>Loading profile...</p>

  return (
    <div className="max-w-screen-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">
        {profile.firstName} {profile.lastName}
      </h1>
      <p className="mb-4">{profile.about}</p>

      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      <Suspense fallback={<p>Loading posts...</p>}>
        <UserPosts />
      </Suspense>
    </div>
  )
}

export default ProfilePage