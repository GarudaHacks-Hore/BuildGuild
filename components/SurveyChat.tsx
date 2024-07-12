import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface SurveyChatProps {
  message: {
    id: number;
    role: string;
    content: string;
    created_at: Date;
  };
}

const SurveyChat = ({ message }: SurveyChatProps) => {

  const isCurrentUser = message.role === "user";

  const bubbleTheme =
    message.role === "user" || isCurrentUser
      ? "bg-black text-white"
      : "text-black bg-gray-200";

  return (message && message.role) ? (
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
        <p className="text-xs font-bold">{message.id % 2 === 0 ? "User" : "Assistant"}</p>
        <p className="mb-2">{message.content}</p>
        <p className="text-xs text-right">
          {dayjs(message.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SurveyChat;
