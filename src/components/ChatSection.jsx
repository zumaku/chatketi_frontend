import { useEffect, useState, useRef } from "react";
import { icon } from "../assets";
import { CgArrowUpO } from "react-icons/cg";
import { MdOpenInFull, MdCloseFullscreen } from "react-icons/md";
import { LoadingText } from "../components";
import { useChatQuery } from "../hooks";

export default function ChatSection({ isFullScreen, setIsFullScreen }) {
  // State untuk menyimpan daftar pesan.
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Selamat datang! Saya senang dapat membantu Anda memahami pedoman karya tulis ilmiah ini. Apa yang Anda ingin tahu tentang pedoman ini?",
    },
  ]);

  const [input, setInput] = useState(""); // State untuk input pengguna
  const [errorIndices, setErrorIndices] = useState([]); // State untuk menyimpan indeks pesan yang mengalami error
  const messagesEndRef = useRef(null); // Referensi ke elemen terakhir untuk scroll otomatis
  const { fetchChatResponse, isLoading } = useChatQuery(
    "http://127.0.0.1:8000/query"
  );

  // Fungsi untuk scroll otomatis ke bawah setiap ada pesan baru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fungsi untuk mengirim pesan
  const handleSend = async () => {
    if (!input.trim()) return; // Jika input kosong, hentikan proses

    // Tambahkan pesan pengguna dan placeholder untuk bot ke dalam state messages
    const newMessages = [
      ...messages,
      { type: "user", text: input },
      { type: "bot", text: "" },
    ];
    const botIndex = newMessages.length - 1; // Indeks placeholder bot
    setMessages(newMessages); // Update state
    setInput(""); // Kosongkan input

    // Ambil respon dari server
    const response = await fetchChatResponse(input);

    // Update teks pesan bot dengan respon atau pesan error jika respon null
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === botIndex
          ? { ...msg, text: response ?? "Maaf, terjadi kesalahan." }
          : msg
      )
    );

    // Jika respon null, tambahkan indeks pesan ke errorIndices
    if (!response) setErrorIndices((prev) => [...prev, botIndex]);
  };

  // Scroll otomatis ke bawah setiap kali daftar pesan berubah
  useEffect(scrollToBottom, [messages]);

  return (
    <div
      className={`w-full sm:w-1/2 sm:pl-5 flex flex-col h-full justify-start relative m-auto transition-all
        ${isFullScreen ? "sm:w-3/5" : "sm:w-1/2"}`}
    >
      {/* Chat */}
      <div className="sm:flex justify-between items-center hidden">
        <h1 className="font-head text-xl mb-3">Chat</h1>
        <div className="hover:scale-105 hover:cursor-pointer hover:text-accent">
          {!isFullScreen ? (
            <MdOpenInFull onClick={() => setIsFullScreen(!isFullScreen)} />
        ) : (
            <MdCloseFullscreen onClick={() => setIsFullScreen(!isFullScreen)} />
          )}
        </div>
      </div>
      <div className={`h-[90%] sm:pr-4 sm:pb-4 overflow-y-scroll no-scrollbar`}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex space-x-4 items-start mb-2 ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.type !== "user" && <img src={icon} alt="" />}
            <p
              className={`max-w-9/12 p-2.5 rounded-lg ${
                message.type === "user"
                  ? "bg-[#62C3A6] text-black text-end"
                  : "bg-gray-200 text-black"
              } ${
                errorIndices.includes(index)
                  ? "border-2 border-red-300 bg-red-200 font-semibold"
                  : ""
              }`}
            >
              {isLoading && index === messages.length - 1 ? (
                <LoadingText />
              ) : (
                message.text
              )}
            </p>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex flex-row w-full border border-gray-600 rounded-lg bg-white shadow-xl my-5">
        <input
          type="text"
          className="font-body font-semibold text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 placeholder:text-gray-700"
          placeholder="Ketik di sini"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button className="m-2" onClick={handleSend}>
          <CgArrowUpO size={28} className="text-accent" />
        </button>
      </div>
    </div>
  );
}
