import React from "react";
import BubbleChat from "./BubbleChat";
import { Message } from "@/types/Message";

const PromptRoom = ({ messages }: { messages: Message[] }) => {
  return (
    <>
      {messages.map((message) => (
        <BubbleChat key={message.id} message={message} />
      ))}
    </>
  );
};

export default PromptRoom;
