import PostCard from "./components/user-post/page"
import NavBar from "./components/navbar/page"
import NewsFeed from "./components/input-post/page"



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