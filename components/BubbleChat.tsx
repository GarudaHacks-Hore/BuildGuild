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
  userLoggedInId: number;
}

const BubbleChat = ({ message, userLoggedInId }: BubbleChatProps) => {
  const [senderName, setSenderName] = useState<string>("");

  const isCurrentUser = message.sender === userLoggedInId;

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

  const bubbleTheme =
    message.role === "user" || isCurrentUser
      ? "bg-black text-white"
      : "text-black bg-gray-200";

  return (message && !message.sender) || (message.sender && senderName) ? (
    <div
      className={cn(
        `flex ${
          message.role === "user" || isCurrentUser
            ? "justify-end"
            : "justify-start"
        } mb-2`
      )}
    >
      <div
        className={`w-full ${bubbleTheme} p-2 rounded-lg w-fit min-w-[300px] max-w-xl`}
      >
        <p className="text-xs font-bold">{senderName}</p>
        <p className="mb-2">{message.chat}</p>
        <p className="text-xs text-right">
          {dayjs(message.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BubbleChat;
