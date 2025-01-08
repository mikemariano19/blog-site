'use client'

import Image from "next/image"

export default function CommentModal() {


  
    return (
            <div className="bg-white/90 w-screen h-screen flex justify-center">
                <div className="max-w-screen-lg rounded-md px-2 my-4 xl:px-0 mx-auto bg-blue-500 shadow-lg shadow-slate-500 text-slate-900 z-10 ">
                    {/* modal header */}
                    <div className="flex justify-end">
                        <Image src='./exit.svg' alt="exit" width='14' height='14' className="p-4 bg-black" />
                    </div>
                    <div className="flex justify-center top-0">
                        <div className="py-4 text-center bg-white font-semibold text-2xl z-20">
                            <h1>Pablo Escobar's Post</h1>
                        </div>
                    </div>
                    <div className="border-t"></div>
                    <div className=" bg-red-500 p-2 max-h-[80vh] overflow-auto border border-slate-200 rounded-t-md flex justify-center">
                        <div>
                            <div className="flex mt-4">
                                <span className="bg-slate-900 w-16 h-16 rounded-full mr-6"></span>
                                <div className="my-auto">
                                    <h2 className="text-xl font-medium">Pablo Escobar</h2>
                                    <p>1m</p>
                                </div>
                            </div>
                            {/* caption */}
                            <div>
                                <p className="py-1">
                                    Magnus Carlsen came in jeans to the 2nd day of World Rapid Championships 2024. And this led to one event happening after another. Check out this video to find out the complete story with regards to Magnus Carlsen Jeans Episode.
                                    Video: ChessBase India 
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
                            <div className="flex pt-4">
                                <span className="bg-slate-900 w-12 h-12 rounded-full mr-2 shrink-0"></span>
                                <div className="bg-slate-100 rounded-lg py-2 px-4">
                                    <h2 className="font-medium">Lex Luthor</h2>
                                    <p className="text-wrap">
                                        Magnus Carlsen came in jeans to the 2nd day of World Rapid Championships 2024. And this led to one event happening after another. Check out this video to find out the complete story with regards to Magnus Carlsen Jeans Episode.
                                        Video: ChessBase India
                                    </p>
                                </div>
                            </div>
                            <div className="flex pt-4">
                                <span className="bg-slate-900 w-12 h-12 rounded-full mr-2 shrink-0"></span>
                                <div className="bg-slate-100 rounded-lg py-2 px-4">
                                    <h2 className="font-medium">Clark Kent</h2>
                                    <p>
                                        Please Dont Destroy returned to “Saturday Night Live” this week with a new sketch, their first of the season.
                                    </p>
                                </div>
                            </div>
                            <div className="flex pt-4">
                                <span className="bg-slate-900 w-12 h-12 rounded-full mr-2 shrink-0"></span>
                                <div className="bg-slate-100 rounded-lg py-2 px-4">
                                    <h2 className="font-medium">Monkey D. Luffy</h2>
                                    <p>
                                        Imagine him as one of the players in Squid Game
                                    </p>
                                </div>
                            </div>
                            <div className="flex pt-4">
                                <span className="bg-slate-900 w-12 h-12 rounded-full mr-2 shrink-0"></span>
                                <div className="bg-slate-100 rounded-lg py-2 px-4">
                                    <h2 className="font-medium">Vinsmoke Sanji</h2>
                                    <p>
                                        NEWS UPDATE: Why isn't the VP included in the NSC anymore? ES Lucas Bersamin said that "at the moment, the VP is not considered relevant to the responsibilities of membership in the NSC."  
                                        Bersamin said that the president can still add members if the need arises. | via Jean Mangaluz
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* input comment */}
                        <div className="border-t"></div>
                        <div className="flex h-20 py-4 pl-2 max-w-screen-lg z-20">
                            <span className="bg-slate-900 w-12 h-12 rounded-full mr-2 shrink-0"></span>
                            <div className="flex rounded-lg w-full">
                                <input type="text" className="focus:outline focus:outline-0 w-full p-2 rounded-xl bg-slate-100" placeholder="Comment as Lex Luthor" />
                                <button className="-translate-x-8 -mr-4" type="submit">
                                    <Image src='./send.svg' width='24' height='24' alt="send"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    )
}