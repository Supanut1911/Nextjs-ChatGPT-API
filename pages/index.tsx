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
    <>
      <p>Hi GPT</p>
      {chatLogs.map((message, idx) => (
        <div key={idx}>{message.message}</div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type something..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button type="submit">Go</button>
      </form>
    </>
  );
}
