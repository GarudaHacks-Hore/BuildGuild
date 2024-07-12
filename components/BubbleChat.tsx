import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface BubbleChatProps {
  message: {
    id: number;
    created_at: Date;
    sender?: number;
    role?: string;
    chat: string;
  };
}

const BubbleChat = ({ message }: BubbleChatProps) => {
  const [senderName, setSenderName] = useState<string>("");

  const isCurrentUser = message.sender === 2;

  useEffect(() => {
    async function fetchSenderName() {
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
    }
    if (message.sender) {
      fetchSenderName();
    }
  }, [message.sender]);

  return (
    <div
      className={cn(
        `flex ${
          message.role === "user" || isCurrentUser
            ? "justify-end"
            : "justify-start"
        } mb-2`
      )}
    >
      <div className={`bg-black w-full text-white p-2 rounded-lg max-w-xs `}>
        <p className="text-xs font-bold">{senderName}</p>
        <p>{message.chat}</p>
        <p className="text-xs text-right">
          {dayjs(message.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
    </div>
  );
};

export default BubbleChat;
