import { useEffect, useState, useRef } from "react";
import { icon } from "../assets";
import { CgArrowUpO } from "react-icons/cg";
import { LoadingText, Navbar } from "../components";
import useChatQuery from "../hooks/useChatQuery";

export default function Chat() {
  /*
   * State untuk menyimpan daftar pesan.
   * Format pesan: { type: "user" | "bot", text: string }
   */
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Selamat datang! Saya senang dapat membantu Anda memahami pedoman karya tulis ilmiah ini. Apa yang Anda ingin tahu tentang pedoman ini?",
    },
    { type: "user", text: "Selamat datang!" },
    {
      type: "bot",
      text: "Maaf, sedang terjadi kesalahan.",
    },
  ]);
  const [input, setInput] = useState(""); // State untuk menyimpan input teks pengguna.
  const [errorIndices, setErrorIndices] = useState([]); // State untuk melacak pesan bot yang error.
  const messagesEndRef = useRef(null);

  // Ambil fungsi fetchChatResponse, isError, dan isLoading dari hook useChatQuery
  const { fetchChatResponse, isError, isLoading } = useChatQuery("http://127.0.0.1:8000/query");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { type: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const botPlaceholderIndex = messages.length + 1;
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: "" },
    ]);

    const response = await fetchChatResponse(input);

    if (response !== null) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[botPlaceholderIndex] = {
          type: "bot",
          text: response,
        };
        return updatedMessages;
      });
    } else {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[botPlaceholderIndex] = {
          type: "bot",
          text: "Maaf, terjadi kesalahan.",
        };
        return updatedMessages;
      });

      setErrorIndices((prevErrorIndices) => [
        ...prevErrorIndices,
        botPlaceholderIndex,
      ]);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="h-screen">
      <Navbar />
      <div className="container mx-auto flex justify-between items-center px-4 pt-20 h-full">
        {/* PDF Viewer */}
        <embed
          src="/pedoman-pkti-2023.pdf"
          className="rounded-xl overflow-hidden w-1/2"
          width="100%"
          height="100%"
          type="application/pdf"
        />

        {/* Chat */}
        <div className="w-1/2 pl-5 flex flex-col h-full justify-start relative">
          {/* Chat */}
          <h1 className="font-head text-xl mb-3">Chat</h1>
          <div className="h-[90%] pr-4 pb-4 overflow-y-scroll">
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
      </div>
    </main>
  );
}
