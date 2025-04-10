import HomePage from ".";
import Navbar from "./components/navbar/page";


export default function Page() {
    return (
      <div className="font-roboto text-slate-200">
        <div>
          <Navbar />
          <HomePage />
        </div>
      </div>
    )
} 