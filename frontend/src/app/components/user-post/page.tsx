'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

type Post = {
  _id: string
  content: string
  createdAt: string
}

const UserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const res = await axios.get('http://localhost:4001/api/posts/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPosts(res.data)
      } catch (err) {
        console.error('Error loading posts', err)
        setError('Failed to load posts.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (error) return <p className="text-red-500">{error}</p>
  if (loading) return <p>Loading posts...</p>

  return (
    <>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-lg mb-4">
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </>
  )
}

export default UserPosts
