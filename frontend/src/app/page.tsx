import PostCard from "./components/post-card/page"
import NavBar from "./components/navbar/page"
import NewsFeed from "./components/news-feed/page"



export default function Page() {
    return (
      <div className="font-roboto text-slate-200">
        <div>
          <NavBar />
          <NewsFeed />
          <PostCard />
        </div>
      </div>
    )
} 