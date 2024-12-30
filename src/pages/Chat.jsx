import { useState } from "react";
import { icon } from "../assets";
import { CgArrowUpO } from "react-icons/cg";
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { type: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:8000/query", {
        query: input,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const botMessage = { type: "bot", text: response.data.result };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput("");
  };

    return (
    <main className="container mx-auto flex h-1/2 justify-between items-center px-4">
      {/* PDF Viewer */}
      <div className="w-1/2">
        <h1 className="font-head text-xl mb-2">
          Pedoman Penulisan Karya Tulis Ilmiah 2023
        </h1>
        <embed
          src="/pedoman-pkti-2023.pdf"
          className="rounded-xl overflow-hidden"
          width="100%"
          height="600px"
          type="application/pdf"
        />
      </div>

      <div className="w-1/2 p-5 flex flex-col h-screen justify-between overflow-y-scroll">
        {/* Chat */}
        <div className="flex flex-col space-y-4 h-full">
            <h1 className="font-head text-xl mb-2">Chat</h1>
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex space-x-4 items-start justify-${
                        message.type === "user" ? "end" : "start"
                    }`}
                >
                    {message.type === "bot" && <img src={icon} alt="" />}
                    <p
                        className={`max-w-9/12 p-2.5 rounded-lg ${
                            message.type === "user" ? "bg-[#62C3A6] text-black text-end" : "bg-gray-200 text-black"
                        }`}
                    >
                        {message.text}
                    </p>
                </div>
            ))}
        </div>
        <div className="flex flex-row w-full border rounded-lg bg-white shadow-xl">
          <input
            type="text"
            className="font-body font-semibold text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5"
            placeholder="Ketik di sini"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="m-2" onClick={handleSend}>
            <CgArrowUpO size={28} className="text-accent" />
          </button>
        </div>
      </div>
    </main>
  );
}
