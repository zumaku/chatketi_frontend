import { useState } from "react";
import { Navbar, PDFSection, ChatSection } from "../components";

export default function Chat() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <main className="h-screen">
      <Navbar />
      <div className="container mx-auto flex justify-between items-center px-4 pt-20 h-full">
        {/* PDF Viewer */}
        <PDFSection isFullScreen={isFullScreen} />

        {/* Chat */}
        <ChatSection isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} /> 
      </div>
    </main>
  );
}
