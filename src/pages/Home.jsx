import { LuBotMessageSquare } from "react-icons/lu";
import { Navbar, Button } from "../components";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center space-y-8">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mb-4">
        Bikin KTI tanpa{" "}
        <span className="relative inline-block">
          <span className="absolute inset-0 bg-accent rounded-lg -z-10 px-4 py-1 rotate-3 w-[110%] h-[110%] -translate-x-1"></span>
          <span className="relative text-white">drama</span>
        </span>
      </h1>
      <p className="w-full md:w-[575px] text-center">
        Chat dengan asisten AI yang siap membantumu memahami pedoman karya tulis
        ilmiah
        <span>UIN Alauddin Makassar</span>.
      </p>
      <Link to="/chat">
        <Button>
          <LuBotMessageSquare size={22} />
          <span>Mulai Chating</span>
        </Button>
      </Link>
    </main>
  );
}
