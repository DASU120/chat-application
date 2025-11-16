import { useState } from "react";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";

export default function AnswerFeedback() {
  const [feedback, setFeedback] = useState(null);
  return (
    <div className="flex space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">

      <button
        onClick={() => setFeedback(feedback === "up" ? null : "up")}
        className="p-1 rounded"
      >
        <LuThumbsUp
          size={18}
          className={
            feedback === "up"
              ? "text-green-500"       
              : "text-gray-500 hover:text-green-500" 
          }
        />
      </button>

      <button
        onClick={() => setFeedback(feedback === "down" ? null : "down")}
        className="p-1 rounded"
      >
        <LuThumbsDown
          size={18}
          className={
            feedback === "down"
              ? "text-red-500"       
              : "text-gray-500 hover:text-red-500" 
          }
        />
      </button>

    </div>
  );
}
