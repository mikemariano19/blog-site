"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { format } from 'timeago.js';
import CommentModal from '../comment-modal/page';

interface CommentData {
    _id: string;
    userName: string;
    text: string;
    createdAt: string;
}

interface PostData {
    _id: number;
    caption: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    comments: CommentData[];
}

export default function UserPost() {
    const [isModalOpen, setIsModalIsOpen] = useState(false);
    const [postData, setPostData] = useState<PostData[]>([]);
    const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        const fetchData = setTimeout(() => {
            // Fetch data from the backend
            axios.get('http://localhost:4001/api/posts')
                .then(response => {
                    setPostData(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError('Network Error: Unable to fetch data');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 300)
        return () => clearTimeout(fetchData); // Cleanup on unmount
    }, [])

    const handleCommentClick = (post: PostData) => {
        setSelectedPost(post);
        setIsModalIsOpen(true);
    };

    return (
        <>
            {isLoading ?
                <div className='flex justify-center items-center h-96'>
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                </div>
                :
                postData.map((post) => (
                    <div key={post._id}>
                        <div className="max-w-screen-md px-2 xl:px-0 mx-auto mt-26 text-slate-900 pb-5">
                            <div className="bg-white border border-slate-200 rounded-md px-2 pt-2 z-10">
                                <div className="flex">
                                    <span className="bg-slate-900 w-16 h-16 rounded-full mr-6"></span>
                                    <div className="my-auto">
                                        <h2 className="text-xl font-medium">{post._id}</h2>
                                        <p>{format(post.createdAt)}</p>
                                    </div>
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                                <div className='text-lg text-slate-900 ml-[87px] mt-2 mb-6'>
                                    {post.caption}
                                </div>
                                {/* reaction counts */}
                                <div className="p-2 flex">
                                    <Image src="./like-count.svg" width='20' height='20' alt="" />
                                    <span className="px-2">223</span>
                                </div>
                                <div className="border-t"></div>
                                {/* button */}
                                <div className="flex py-1">
                                    <button className="flex justify-center flex-1 p-2 hover:bg-slate-200 hover:rounded-sm">
                                        <Image src="/like.svg" alt="Like Icon" width="24" height="24"/>
                                        <span className="px-2">Like</span>
                                    </button>
                                    <button className="flex justify-center flex-1 p-2 hover:bg-slate-200 hover:rounded-sm" onClick={() => handleCommentClick(post)}>
                                        <Image src="/comment.svg" alt="Like Icon" width="24" height="24"/>
                                        <span className="px-2">Comment</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {isModalOpen && selectedPost && (
                <div className="z-20 flex justify-center top-0 left-0 fixed">
                    <CommentModal isOpen={isModalOpen} onClose={() => setIsModalIsOpen(false)} postData={selectedPost} />
                </div>
            )}
        </>
    );
}