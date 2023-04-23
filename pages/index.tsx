import { ChangeEvent, useState } from "react";

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

    //clear
    setInputValue("");
  };

  return (
    <>
      <h1>Hi GPT</h1>
      {chatLogs.map((message, idx: number) => {
        <div key={idx}>{message.message}</div>;
      })}
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
