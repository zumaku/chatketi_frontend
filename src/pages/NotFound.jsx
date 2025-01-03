import { Link } from "react-router-dom";
import { Button } from "../components";

export default function NotFound() {
    return(
        <main className="h-screen text-secondary">
            <div className="container mx-auto flex justify-center items-center h-full">
                <div className="text-center">
                    <h1 className="text-8xl font-bold">4<span className="text-accent">0</span>4</h1>
                    <p className="text-4xl font-bold mb-2">Not Found</p>
                    <p className="mb-4">Anda mengakses halaman yang tidak tersedia atau tidak termasuk bagian dari ChatKTI.</p>
                    <Link to="/">
                        <Button style="m-auto">Kembali</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
};
