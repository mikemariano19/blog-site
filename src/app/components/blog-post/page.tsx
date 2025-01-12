'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

import CommentModal from "../comment-modal/page"

// import { useEffect, useState } from "react"

// type ImageData = {
//     id: number;
//     url: string;
//     title: string;
// }

export default function BlogPost() {
    const [isModalOpen, setIsModalIsOpen] = useState(false)
    
    useEffect(() => {
        if(isModalOpen){
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }

        // Cleanup on unmount
        return () => document.body.classList.remove("overflow-hidden")
    }, [isModalOpen])

    // const [images, setImages] = useState<ImageData[]>([])
    // useEffect(() => {
    //     const fetchImage = async () => {
    //         try {
    //             const response = await fetch('https://api.apicbase.com/api/v2/media/images')
    //             const data: ImageData[] = await response.json();
    //             setImages(data)
    //         } catch(error) {
    //         console.log('Error fetching images', error)
    //     }
    // }; 
    //     fetchImage();
    // }, [])

 
    
    return (
        <div>
            <div className="max-w-screen-xl px-2 xl:px-0 mx-auto mt-26 text-slate-900 pb-5">
            <div className=" bg-white` border border-slate-200 rounded-md px-2 pt-2">
                <div className="flex">
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
                    <button className="flex justify-center flex-1 p-2 hover:bg-slate-200 hover:rounded-sm" onClick={()=> setIsModalIsOpen(true)}>
                        <Image src="/comment.svg" alt="Like Icon" width="24" height="24"/>
                        <span className="px-2">Comment</span>
                    </button>
                </div>
            </div>
        </div>
            {isModalOpen && (
                    <div className="z-50 flex justify-center top-0 left-0 fixed">
                        <CommentModal />
                    </div>
            )}
        </div>
    )
}