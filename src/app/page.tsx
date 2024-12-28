import BlogPost from "./components/news-feed/page"
import Footer from "./components/footer/page"
import NavBar from "./components/navbar/page"

export default function Page() {
    return (
      <div className="font-roboto text-slate-200">
        <div>
          <NavBar />
          <BlogPost />
          <Footer />
        </div>
      </div>
    )
} 