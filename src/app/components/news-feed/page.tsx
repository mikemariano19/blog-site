import BlogPost from "../blog-post/page"

export default function NewsFeed() {
    return (
        <div className="max-w-screen-lg mx-auto">
            <div>
                <h1 className="text-slate-800 text-3xl mt-20">News Feed</h1>
            </div>
            {BlogPost()}
        </div>
    )
}