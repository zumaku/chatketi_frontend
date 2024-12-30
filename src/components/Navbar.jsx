import { logo } from "../assets";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  return (
    <div className="w-2/3 py-2 flex justify-between items-center font-bold m-auto">
      <div className="flex space-x-4 items-center">
        <Link to="/" className="w-44">
          <img src={logo} alt="Chat Keti Logo" />
        </Link>
        <ul className="flex space-x-8 justify-center items-center">
            <li className="hover:scale-105"><Link>Beranda</Link></li>
            <li className="hover:scale-105"><Link>Sekilas</Link></li>
            <li className="hover:scale-105"><Link>Docs</Link></li>
        </ul>
      </div>
      <div className="flex space-x-4">
        <button className="bg-accent hover:scale-105 text-white px-4 py-2 rounded-lg font-bold">Support Kami</button>
        <button className="bg-white border hover:scale-105 text-accent border-accent font-bold px-4 py-2 rounded-lg">Masuk</button>
      </div>
    </div>
  );
}
