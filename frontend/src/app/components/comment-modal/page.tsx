'use client'

import { useEffect, useState, useRef, RefObject } from "react";
import axios from "axios";
import Image from "next/image";
import { format } from 'timeago.js';
import useOnClickOutside from '../hooks/useClickOutside';

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

interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    postData: PostData | null;
}

const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, postData }) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<CommentData[]>(postData?.comments || []);
    const [isPostExpanded, setIsPostExpanded] = useState(false);
    const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({});
    const modalRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(modalRef as RefObject<HTMLElement>, () => {
        if (isOpen) {
            onClose();
        }
    });

 

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

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
            const editableDiv = document.getElementById('editableDiv');
            if (editableDiv) editableDiv.textContent = '';
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommentSubmit(e as unknown as React.FormEvent);
        }
    };

    const togglePostExpansion = () => {
        setIsPostExpanded(!isPostExpanded);
    };

    const toggleCommentExpansion = (commentId: string) => {
        setExpandedComments(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId]
        }));
    };

    return (
        <div className="bg-white/70 w-screen h-screen flex justify-center">
            <div
                ref={modalRef}
                className="sm:container md:max-w-screen-sm bg-white overflow-y-auto my-2 max-h-auto rounded-md px-0 xl:px-0 mx-2 sm:mx-0 shadow-lg shadow-slate-500 text-slate-900 z-10"
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
                <div className="h-max overflow-y-auto border-slate-200 flex justify-center">
                    <div className="w-full px-2">
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
                                {isPostExpanded ? postData.caption : truncateText(postData.caption, 100)}
                                {postData.caption.length > 150 && (
                                    <button onClick={togglePostExpansion} className="text-blue-500 ml-2">
                                        {isPostExpanded ? 'See Less' : 'See More'}
                                    </button>
                                )}
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
                                <Image src="/like.svg" alt="Like Icon" width="24" height="24" />
                                <span className="px-2">Like</span>
                            </button>
                            <button className="flex justify-center flex-1 p-2 hover:bg-slate-200 hover:rounded-sm">
                                <Image src="/comment.svg" alt="Like Icon" width="24" height="24" />
                                <span className="px-2">Comment</span>
                            </button>
                        </div>
                        <div className="border-t"></div>

                        {/* comments */}
                        <div className="py-2">
                            {comments.map((comment) => (
                                <div key={comment._id} className="flex flex-col">
                                    <div className="flex py-2">
                                        <span className="bg-slate-900 w-12 h-12 rounded-full mr-2 shrink-0"></span>
                                        <div className="bg-slate-100 rounded-lg py-2 px-4 w-full">
                                            <h2 className="font-medium">{comment.userName}</h2>
                                            <p className="break-words">
                                                {expandedComments[comment._id] ? comment.text : truncateText(comment.text, 250)}
                                                {comment.text.length > 250 && (
                                                    <button onClick={() => toggleCommentExpansion(comment._id)} className=" font-medium ml-2 hover:underline">
                                                        {expandedComments[comment._id] ? 'See Less' : 'See More'}
                                                    </button>
                                                )}
                                            </p>
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
                        <div className="w-full">
                            <div
                                id="editableDiv"
                                contentEditable="true"
                                className="focus:outline focus:outline-0 py-3 pl-2 pr-10 rounded-xl bg-slate-100 break-words"
                                onInput={(e) => setCommentText(e.currentTarget.textContent || '')}
                                onKeyDown={handleKeyDown}
                            >

                            </div>
                        </div>
                        <button className="-translate-x-8 -mr-4 shrink-0" type="submit">
                            <Image src='./send.svg' width='24' height='24' alt="send" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CommentModal;