
import NavBar from "./components/navbar/page"
import HomePage from "./pages"




export default function Page() {
    return (
      <div className="font-roboto text-slate-200">
        <div>
          <NavBar />
          <HomePage />
        </div>
      </div>
    )
} 