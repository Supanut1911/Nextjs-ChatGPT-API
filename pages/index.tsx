import axios from "axios";
import { log } from "console";
import { useEffect, useState } from "react";

interface ChatLog {
  type: string;
  message: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setChatLogs((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    //call api
    sendMessage(inputValue);

    //clear
    setInputValue("");
  };

  const sendMessage = (message: string) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };

    setIsloading(true);
    axios
      .post(url, data, { headers })
      .then((response) => {
        setChatLogs((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto mx-w-[800px]">
      <div className="flex flex-col h-screen bg-gray-800">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
          Hey yo GPT!
        </h1>
        <div className="flex-grow p-8">
          <div className="flex flex-col space-y-4">
            {chatLogs.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                } `}
              >
                <div
                  className={`${
                    message.type === "user" ? "bg-purple-500" : "bg-gray-500"
                  } rounded-lg p-4 text-white max-w-sm`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-none p-8">
          <div className="flex rounded-lg border border-gray-600 bg-gray-700">
            <input
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              type="text"
              placeholder="type something..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
            >
              Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
