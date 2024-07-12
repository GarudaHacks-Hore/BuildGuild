import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface BubbleChatProps {
  message: {
    id: string;
    chat: string;
    created_at: string;
    sender: string;
  };
}

const BubbleChat = ({ message }: BubbleChatProps) => {
  const [senderName, setSenderName] = useState("");
  const userId = "current-user-id"; // Ganti dengan user ID yang sesuai

  useEffect(() => {
    const fetchSenderName = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", message.sender)
        .single();

      if (error) {
        console.error("Error fetching sender name: ", error);
      } else {
        setSenderName(data.name);
      }
    };
    fetchSenderName();
  }, [message.sender]);

  const isCurrentUser = message.sender === userId;
  const bubbleStyle = isCurrentUser
    ? "bg-black text-white self-end"
    : "bg-gray-300 text-black self-start";

  return (
    <div className={`p-2 rounded-lg mb-2 max-w-xs ${bubbleStyle}`}>
      {!isCurrentUser && <div className="text-xs font-bold">{senderName}</div>}
      <div className="text-sm">{message.chat}</div>
      <div className="text-xs text-right text-gray-500">
        {new Date(message.created_at).toLocaleString()}
      </div>
    </div>
  );
};

export default BubbleChat;
