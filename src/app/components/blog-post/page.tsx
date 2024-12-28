'use client'
import { useEffect, useState } from "react"

type ImageData = {
    id: number;
    url: string;
    title: string;
}

export default function BlogPost() {
    const [images, setImages] = useState<ImageData[]>([])
    useEffect(()=> {
        const fetchImage = async () => {
            try {
                const response = await fetch('https://api.apicbase.com/api/v2/media/images')
                const data: ImageData[] = await response.json();
                setImages(data)
            } catch(error) {
            console.log('Error fetching images', error)
        }
    }; 
        fetchImage()
    }, [])
    return (
        <div className="max-w-screen-lg mx-auto">
            <div className="container bg-slate-100 border border-red-500">
                <div className="">
                    {images.map((image)=>(
                        <div key={image.id}>
                            <img src={image.url} alt={image.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}