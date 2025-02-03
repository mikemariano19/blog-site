"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { format } from 'timeago.js';

import Modal from '../comment-modal/page';
import CommentModal from '../comment-modal/page';

interface PostData {
    _id: number;
    caption: string;
    image: string;
    createdAt: string;
    updatedAt: string;
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
                                    <p>{format(post.createdAt)}</p>
                                </div>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div className='text-lg text-slate-900 ml-[87px] mt-2 mb-6'>
                                {post.caption}
                            </div>
                            <div className="border-t"></div>
                            {/* button */}
                            <div className="flex py-1">
                                <button className="flex justify-center flex-1 p-2 hover:bg-slate-200 hover:rounded-sm">
                                    <Image src="/like.svg" alt="Like Icon" width="24" height="24"/>
                                    <span className="px-2">Like</span>
                                </button>
                                <button className="flex justify-center flex-1 p-2 hover:bg-slate-200 hover:rounded-sm" onClick={() => setIsModalIsOpen(true)}>
                                    <Image src="/comment.svg" alt="Like Icon" width="24" height="24"/>
                                    <span className="px-2">Comment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <CommentModal isOpen={isModalOpen} onClose={() => setIsModalIsOpen(false)}>
                <h2>Comments</h2>
                {/* Add your comment form or comment list here */}
            </CommentModal>
        </>
    );
}