"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import PromptRoom from "@/components/PromptRoom";
import { PromptHistory } from "@/types/PromptHistory";
import { Message } from "@/types/Message";

export default function Discover() {
  const [todayPrompts, setTodayPrompts] = useState<PromptHistory[]>([]);
  const [yesterdayPrompts, setYesterdayPrompts] = useState<PromptHistory[]>([]);
  const [previousPrompts, setPreviousPrompts] = useState<PromptHistory[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchPromptHistories = async () => {
      const { data, error } = await supabase
        .from("prompt_histories")
        .select("*");

      if (error) {
        console.error("Error fetching prompt histories: ", error);
        return;
      }

      const today: PromptHistory[] = [];
      const yesterday: PromptHistory[] = [];
      const previous: PromptHistory[] = [];

      const now = dayjs();
      const startOfToday = now.startOf("day");
      const startOfYesterday = startOfToday.subtract(1, "day");

      data.forEach((prompt) => {
        const createdAt = dayjs(prompt.created_at);

        if (createdAt.isSame(startOfToday, "day")) {
          today.push(prompt);
        } else if (createdAt.isSame(startOfYesterday, "day")) {
          yesterday.push(prompt);
        } else if (createdAt.isAfter(startOfToday.subtract(30, "day"))) {
          previous.push(prompt);
        }
      });

      setTodayPrompts(today);
      setYesterdayPrompts(yesterday);
      setPreviousPrompts(previous);
    };

    fetchPromptHistories();
  }, []);

  const handleClick = async (id: string) => {
    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .eq("roomId", id);

    if (error) {
      console.error("Error fetching prompt histories: ", error);
      return;
    } else {
      setMessages(data);
    }
  };

  const handleSendMessage = (message: string) => {
    console.log(message);
  };

  return (
    <main
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="flex items-center w-full h-full">
        <div className="w-1/5 px-10 py-4 flex flex-col justify-start h-full gap-6">
          <h1 className="text-2xl font-bold mb-2">Discover People</h1>
          <Button onClick={() => setMessages([])}>New chat</Button>
          {todayPrompts.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-light">Today</h2>
              <div>
                {todayPrompts.map((prompt) => (
                  <p
                    className="text-ellipsis truncate cursor-pointer hover:underline underline-offset-2"
                    key={prompt.id}
                    onClick={() => handleClick(prompt.id)}
                  >
                    {prompt.message}
                  </p>
                ))}
              </div>
            </div>
          )}
          {yesterdayPrompts.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-light">Yesterday</h2>
              <div>
                {yesterdayPrompts.map((prompt) => (
                  <p
                    className="text-ellipsis truncate cursor-pointer hover:underline underline-offset-2"
                    key={prompt.id}
                    onClick={() => handleClick(prompt.id)}
                  >
                    {prompt.message}
                  </p>
                ))}
              </div>
            </div>
          )}
          {previousPrompts.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-light">Previous 30 days</h2>
              <div>
                {previousPrompts.map((prompt) => (
                  <p
                    className="text-ellipsis truncate cursor-pointer hover:underline underline-offset-2"
                    key={prompt.id}
                    onClick={() => handleClick(prompt.id)}
                  >
                    {prompt.message}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-white flex flex-col shadow-lg gap-2 rounded-l-3xl p-6 w-4/5 h-full">
          <div className="border rounded-lg p-4 flex-grow overflow-y-auto bg-gray-50">
            <PromptRoom messages={messages} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center"
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit" className="ml-2">
              Send
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
