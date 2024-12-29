'use client'
// import { useEffect, useState } from "react"

// type ImageData = {
//     id: number;
//     url: string;
//     title: string;
// }

export default function BlogPost() {
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
        <div className="max-w-screen-lg mx-auto mt-26 text-slate-900 py-4">
            <div className=" bg-slate-100 border border-slate-200 rounded-md px-2 pt-2">
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
            </div>
            {/* image */}
            <div className="from-neutral-900">
                <div className="border h-96 w-auto bg-slate-500"></div>
            </div>
            <div>
                <button>
                    
                </button>
            </div>
        </div>
    )
}