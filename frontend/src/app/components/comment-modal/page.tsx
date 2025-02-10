'use client'

import { useState } from "react";
import axios from "axios";


import Image from "next/image"
import { format } from 'timeago.js';



interface CommentModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PostData {
    _id: number;
    caption: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    comments: CommentData[];
}

interface CommentData {
    _id: number;
    userName: string;
    text: string;
    createdAt: string;
}



interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    postData: PostData | null;
}



    const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, postData }) => {
        const [commentText, setCommentText] = useState('');
        const [comments, setComments] = useState<CommentData[]>(postData?.comments || []);

        if (!isOpen || !postData) return null;

        const handleCommentSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!commentText.trim()) return;
    
            try {
                const response = await axios.post(`http://localhost:4001/api/posts/${postData._id}/comments`, {
                    userName: 'Monkey D. Dragon', // Replace with the actual user name
                    text: commentText
                });
    
                setComments([...comments, response.data]);
                setCommentText('');
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        };
        

    return (
            <div className="bg-white/70 w-screen h-screen flex justify-center">
                <div 
                className="sm:container md:max-w-screen-sm  bg-red-500 overflow-y-auto my-2 max-h-auto rounded-md px-0 sm:px-2 xl:px-0 mx-0 sm:mx-2 shadow-lg shadow-slate-500 text-slate-900 z-10"
                 onClick={(e) => e.stopPropagation()}
                >
                    {/* modal header */}
                    <div className="flex justify-between">
                        <div className="my-auto m-4">
                            <Image src="./exit.svg" alt="exit" width='24' height='24' className="p-4 bg-white" />
                        </div>
                        <div className="py-4 text-center bg-white font-semibold text-2xl z-20 pr-6 truncate">
                            <h1 className="truncate">{postData._id}&apos;s Post</h1>
                        </div>
                        <button className="my-auto m-4" onClick={onClose}>
                            <Image src="./exit.svg" alt="exit" width="24" height="24" className="p-4 rounded-full shadow-lg" />
                        </button>
                    </div>
                    <div className="border-t"></div>
                    {/* post */}
                    <div className="p-2 h-max overflow-y-auto border-slate-200 flex justify-center">
                        <div>
                            <div className="flex mt-4">
                                <span className="bg-slate-900 w-16 h-16 rounded-full mr-6"></span>
                                <div className="my-auto">
                                    <h2 className="text-xl font-medium">{postData._id}</h2>
                                    <p className="text-slate-500">{format(postData.createdAt)}</p>
                                </div>
                            </div>
                            {/* caption */}
                            <div>
                                <p className="py-1">
                                    {postData.caption}
                                </p>
                            </div>
                            {/* image */}
                            <div className="from-neutral-900">
                                <div className="h-96 bg-slate-500"></div>
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
                                <button className="flex justify-center flex-1 p-2 hover:bg-slate-200 hover:rounded-sm">
                                    <Image src="/comment.svg" alt="Like Icon" width="24" height="24"/>
                                    <span className="px-2">Comment</span>
                                </button>
                            </div>
                            <div className="border-t"></div>

                            {/* comments */}
                            <div className="py-2">
                            {comments.map((comment) => (
                                    <div key={comment._id}>
                                        <div className="flex py-2">
                                            <span className="bg-slate-900 w-12 h-12 rounded-full mr-2 shrink-0"></span>
                                            <div className="bg-slate-100 rounded-lg py-2 px-4">
                                                <h2 className="font-medium">{comment.userName}</h2>
                                                <p className="text-wrap">{comment.text}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 mb-2">
                                            <p className="text-slate-500 ml-14">{format(comment.createdAt)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                        {/* input comment */}
                        <div className="border-t"></div>
                        <div className="flex h-16 py-2 pl-2 z-10 bottom-0 sticky bg-white">
                            <span className="bg-slate-900 w-12 h-12 rounded-full mr-2 shrink-0"></span>
                            <form className="flex rounded-lg w-full" onSubmit={handleCommentSubmit}>
                                <input 
                                maxLength={50} 
                                className="focus:outline focus:outline-0 w-full pl-2 rounded-xl bg-slate-100" 
                                placeholder="Comment as YourUserName"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)} 
                                />
                                <button className="-translate-x-8 -mr-4" type="submit">
                                    <Image src='./send.svg' width='24' height='24' alt="send"/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
    )
}

export default CommentModal