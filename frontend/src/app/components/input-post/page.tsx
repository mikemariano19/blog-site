'use client';

import React, { useState } from 'react';
import axios from 'axios';

const InputPostPage = ({ firstName, lastName }: { firstName: string, lastName: string }) => {
    const [postCaption, setPostCaption] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!postCaption.trim()) {
            setError('Post content cannot be empty.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4001/api/posts', {
                caption: postCaption,
                firstName,
                lastName,
            });

            if (response.status === 201) {
                setSuccess('Post created successfully!');
                setPostCaption(''); // Clear the input field
                setError(''); // Clear any previous errors
                setIsModalOpen(false); // Close the modal
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'An error occurred. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleCloseModal = () => {
        setPostCaption(''); // Clear the input field
        setError(''); // Clear any previous errors
        setIsModalOpen(false); // Close the modal
    };

    const getFontSize = () => {
        const lineCount = postCaption.split('\n').length;
        return lineCount > 2 ? 'text-sm' : 'text-xl';
    };

    return (
        <div className="max-w-screen-md px-2 xl:px-0 mx-auto mt-26 text-slate-900 pb-5">
            {/* Input bar to open the modal */}
            <div
                className="bg-white border flex border-slate-200 rounded-md mt-4 px-2 py-2 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <span className="bg-slate-900 w-16 h-16 rounded-full mr-6 shrink-0"></span>
                <p className="text-gray-500 content-center bg-slate-200 w-full rounded-3xl pl-4">What&apos;s on your mind, {firstName} ?</p>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Create a Post {firstName}</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={handleCloseModal} // Use the close modal handler
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handlePostSubmit}>
                            <div className="mb-4">
                                <textarea
                                    id="post"
                                    className={`border p-2 rounded-lg w-full resize-none ${getFontSize()}`}
                                    placeholder={`What's on your mind?`}
                                    value={postCaption}
                                    onChange={(e) => setPostCaption(e.target.value)}
                                    rows={3} // Default height for 3 lines
                                    style={{ overflowY: 'auto' }}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                            {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                                    onClick={handleCloseModal} // Use the close modal handler
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputPostPage;