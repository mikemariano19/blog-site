import BlogPost from "./components/blog-post/page"
import NavBar from "./components/navbar/page"
import NewsFeed from "./components/news-feed/page"



export default function Page() {
    return (
      <div className="font-roboto text-slate-200">
        <div>
          <NavBar />
          <NewsFeed />
          <BlogPost />
          <BlogPost />
          <BlogPost />
          <BlogPost />
        </div>
      </div>
    )
} 