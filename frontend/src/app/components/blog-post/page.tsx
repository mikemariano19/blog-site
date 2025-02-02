"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

interface PostData {
    _id: number;
    caption: string;
    image: string;
}

export default function BlogPost() {
    const [isModalOpen, setIsModalIsOpen] = useState(false);
    const [postData, setPostData] = useState<PostData[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup on unmount
        return () => document.body.classList.remove("overflow-hidden");
    }, [isModalOpen]);

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:4001/api/posts')
            .then(response => {
                setPostData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Network Error: Unable to fetch data');
            });
    }, []);

    return (
        <>
            {postData?.map((post) => (
                <div key={post._id}>
                    <div className="max-w-screen-md px-2 xl:px-0 mx-auto mt-26 text-slate-900 pb-5">
                    <div className="bg-white border border-slate-200 rounded-md px-2 pt-2 z-10">
                        <div className="flex">
                            <span className="bg-slate-900 w-16 h-16 rounded-full mr-6"></span>
                            <div className="my-auto">
                                <h2 className="text-xl font-medium">{post._id}</h2>
                                <p>1m</p>
                            </div>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className='text-xl text-slate-900 ml-24 my-2'>
                            {post.caption}
                        </div>
                    </div>
                    </div>
                </div>
            ))}
        </>
    );
}