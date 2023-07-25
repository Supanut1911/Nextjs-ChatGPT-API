import { log } from "console";
import { useState } from "react";

export interface CompletionResponse {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
}

const Completion = () => {
  const [completionText, setCompletionText] = useState<CompletionResponse>({
    text: "...",
    finish_reason: "",
    index: 0,
    logprobs: null,
  });
  const handlerCick = async () => {
    const response = await fetch("/api/completion", { method: "POST" });
    const json = await response.json();
    console.log("json", json);
    setCompletionText(json);
  };

  return (
    <div>
      {/* <div>{completionText?.text}</div> */}
      <div
        className="max-w-screen-sm p-10"
        dangerouslySetInnerHTML={{ __html: completionText }}
      ></div>
      <button
        onClick={handlerCick}
        className="bg-gray-300 border rounded-md p-2"
      >
        completion
      </button>
    </div>
  );
};

export default Completion;
