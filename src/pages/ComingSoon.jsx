import { Link } from "react-router-dom";
import { Button, Navbar } from "../components";

export default function ComingSoon() {
    return(
        <main className="h-screen text-secondary">
            <Navbar />
            <div className="container mx-auto flex justify-center items-center h-full">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-2">Page Coming <span className="text-accent">Soon</span></h1>
                    <p className="text-lg mb-4 w-full max-w-[600px] m-auto">Halaman ini masih sedang dalam pengerjaan. Pantau terus akun instagram <a href="https://www.instagram.com/zuma_playground" target="blank" className="font-bold text-accent hover:underline">@zuma_playground</a> untuk info perkembangannya.</p>
                    <Link to="/">
                        <Button style="m-auto">Kembali</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
};
