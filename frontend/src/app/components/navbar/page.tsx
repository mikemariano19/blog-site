import Link from "next/link";
import { BellIcon, HomeIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function HomePage() {
    return (
        <div className="text-slate-200 w-full bg-slate-800">
            <div className="max-w-screen-lg flex justify-between mx-auto">
                <div className="h-12 content-center max-w-screen-lg">
                    <h1 className="text-2xl flex items-center">FuRR_book</h1>
                </div>
                <div className="h-12 flex content-center">
                    <Link href="/" className="p-3 flex">
                        <HomeIcon className="size-6" />
                        <span className="px-1 hidden lg:block">Home</span>
                    </Link>
                    <Link href="/" className="p-3 flex">
                        <BellIcon className="size-6" />
                        <span className="px-1 hidden lg:block">Notification</span>
                    </Link>
                    <Link href="/" className="p-3 flex">
                        <UserCircleIcon className="size-6" />
                        <span className="px-1 hidden lg:block">Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}