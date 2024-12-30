import { logo } from "../assets";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <Link to="/">
          <img src={logo} alt="Chat Keti Logo" />
        </Link>
        <ul>
            <li><Link>Beranda</Link></li>
            <li><Link>Sekilas</Link></li>
            <li><Link>Docs</Link></li>
        </ul>
      </div>
      <div className="">
        <button className="bg-accent text-white px-4 py-2 rounded-lg font-bold">Support Kami</button>
        <button className="bg-white border text-accent border-accent font-bold px-4 py-2 rounded-lg">Masuk</button>
      </div>
    </div>
  );
}
