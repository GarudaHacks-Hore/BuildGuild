import React from "react";
import BubbleChat from "./BubbleChat";
import { Message } from "@/types/Message";

const PromptRoom = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="border rounded-lg p-4 flex-grow overflow-y-auto bg-gray-50">
      {messages.map((message) => (
        <BubbleChat key={message.id} message={message} />
      ))}
    </div>
  );
};

export default PromptRoom;
