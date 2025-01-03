import { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { Button } from "../components";
import { CgMenuRightAlt } from "react-icons/cg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white font-body font-bold absolute right-0 left-0 top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo dan Menu */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src={logo} alt="Logo ChatKTI" className="w-40" />
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/sekilas">Sekilas</Link>
            <Link to="/testimoni">Testimoni</Link>
            <Link to="/docs">Docs</Link>
          </div>
        </div>

        {/* Tombol Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <CgMenuRightAlt size={32} />
          </button>
        </div>

        {/* Tombol kanan */}
        <div className="hidden md:block">
          <Button><a href="https://saweria.co/zumaku" target="blank">Support Kami</a></Button>
        </div>
      </div>

      {/* Menu Dropdown untuk Mobile */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col items-start px-4 py-2 space-y-2">
            <Link to="/sekilas">Sekilas</Link>
            <Link to="/testimoni">Testimoni</Link>
            <Link to="/docs">Docs</Link>
            <Button style="w-full justify-center"><a href="https://saweria.co/zumaku" target="blank">Support Kami</a></Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
