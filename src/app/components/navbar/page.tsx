import Link from "next/link";
import { BellIcon, HomeIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function HomePage() {
    return (
        <div className="text-slate-200 w-full bg-slate-800">
            <div className="max-w-screen-lg flex justify-between mx-auto">
                <div className="h-12 content-center max-w-screen-lg">
                    <h1 className="text-2xl flex items-center">CatDogBlog</h1>
                </div>
                <div className="h-12 flex content-center">
                    <Link href="/" className="p-3">
                        <HomeIcon className="size-6" />
                    </Link>
                    <Link href="/" className="p-3">
                        <UserCircleIcon className="size-6" />
                    </Link>
                    <Link href="/" className="p-3">
                        <BellIcon className="size-6" />
                    </Link>
                </div>
            </div>
        </div>
    )
}