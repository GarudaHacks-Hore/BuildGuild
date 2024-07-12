"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import PromptRoom from "@/components/PromptRoom";
import { PromptHistory } from "@/types/PromptHistory";
import { Message } from "@/types/Message";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { User } from "@supabase/supabase-js";

const DeleteDialog = ({ className, id }: { className: string; id: string }) => {
  const handleDelete = async (historyId: string) => {
    const { data, error } = await supabase
      .from("prompt_histories")
      .delete()
      .eq("id", historyId);

    if (error) {
      console.error("Error fetching prompt histories: ", error);
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={className}>
        <FaRegTrashAlt />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function Discover() {
  const [todayPrompts, setTodayPrompts] = useState<PromptHistory[]>([]);
  const [yesterdayPrompts, setYesterdayPrompts] = useState<PromptHistory[]>([]);
  const [previousPrompts, setPreviousPrompts] = useState<PromptHistory[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [user, setUser] = useState<User>();
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    const fetchUser = async () => {
      const result_user = await supabase.auth.getUser();
      if (result_user.data) {
        setUser(result_user.data.user as User);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPromptHistories = async () => {
      if (user) {
        let result_profile = await supabase
          .from("profiles")
          .select("*")
          .eq("email", user.email);

        if (result_profile.error || result_profile.data.length == 0) {
          return;
        }

        setUserId(result_profile.data[0].id);

        const result_prompt = await supabase
          .from("prompt_histories")
          .select("*")
          .eq("user", result_profile.data[0].id);

        if (result_prompt.error) {
          return;
        }

        const today: PromptHistory[] = [];
        const yesterday: PromptHistory[] = [];
        const previous: PromptHistory[] = [];

        const now = dayjs();
        const startOfToday = now.startOf("day");
        const startOfYesterday = startOfToday.subtract(1, "day");

        result_prompt.data.forEach((prompt: PromptHistory) => {
          const createdAt = dayjs(prompt.created_at);

          if (createdAt.isSame(startOfToday, "day")) {
            today.push(prompt);
          } else if (createdAt.isSame(startOfYesterday, "day")) {
            yesterday.push(prompt);
          } else if (createdAt.isAfter(startOfToday.subtract(30, "day"))) {
            previous.push(prompt);
          }
        });

        // Sort each array by created_at in descending order
        today.sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)));
        yesterday.sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)));
        previous.sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)));

        setTodayPrompts(today);
        setYesterdayPrompts(yesterday);
        setPreviousPrompts(previous);
      }
    };

    fetchPromptHistories();
  }, [user, messages]);

  const handleClick = async (id: string) => {
    setSelectedItemId(id);

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

  const handleSendMessage = async (message: string) => {
    setInputValue("");
    if (!selectedItemId) {
      const { data, error } = await supabase
        .from("prompt_histories")
        .insert({ user: userId, message })
        .select("*");

      if (error) {
        console.error("Error insert prompt histories: ", error);
        return;
      } else {
        const { data: newMsgData, error: newMsgError } = await supabase
          .from("prompts")
          .insert({ chat: message, roomId: data[0].id, role: "user" })
          .select("*");

        if (newMsgError) {
          console.error("Error insert prompt histories: ", newMsgError);
          return;
        } else {
          setSelectedItemId(data[0].id);
          setMessages(newMsgData ? newMsgData : []);

          // LLM
          const response = await axios.post(
            "http://192.168.252.120:8000/find",
            {
              prompt: message,
              identifier: data[0].id,
            }
          );

          try {
            setMessages([
              ...messages,
              ...newMsgData,
              response.data.response[0],
            ]);
          } catch (error) {
            console.error(error);
          }
        }
      }
    } else {
      const { data, error } = await supabase
        .from("prompts")
        .insert({ chat: message, roomId: messages[0].roomId, role: "user" })
        .select("*");
      await axios.post("http://192.168.252.120:8000/find", {
        prompt: message,
        identifier: messages[0].id,
      });

      if (error) {
        console.error("Error insert prompt histories: ", error);
        return;
      } else {
        setMessages([...messages, data[0]]);
      }
    }
  };

  return (
    <main
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="flex items-center w-full h-full">
        <div className="w-1/5 px-10 py-4 flex flex-col justify-start h-full gap-6">
          <h1 className="text-2xl font-bold mb-2">Discover People</h1>
          <Button
            onClick={() => {
              setSelectedItemId(null);
              setMessages([]);
            }}
          >
            New chat
          </Button>
          {todayPrompts.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-light">Today</h2>
              <div className="flex flex-col gap-1">
                {todayPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className={`py-1 group hover:px-2 w-full flex items-center justify-between transition-all rounded-md cursor-pointer ${
                      selectedItemId === prompt.id
                        ? "bg-gray-200 px-2"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <button
                      className="w-full text-left py-1 truncate overflow-ellipsis"
                      onClick={() => handleClick(prompt.id)}
                    >
                      {prompt.message}
                    </button>
                    <DeleteDialog
                      id={prompt.id}
                      className={`hover:bg-gray-300 h-full aspect-square rounded-full flex justify-center items-center ${
                        selectedItemId === prompt.id
                          ? "visible"
                          : "group-hover:visible invisible"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {yesterdayPrompts.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-light">Yesterday</h2>
              <div>
                {yesterdayPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className={`py-1 group hover:px-2 w-full flex items-center justify-between transition-all rounded-md cursor-pointer ${
                      selectedItemId === prompt.id
                        ? "bg-gray-200 px-2"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <button
                      className="w-full text-left py-1 truncate overflow-ellipsis"
                      onClick={() => handleClick(prompt.id)}
                    >
                      {prompt.message}
                    </button>
                    <DeleteDialog
                      id={prompt.id}
                      className={`hover:bg-gray-300 h-full aspect-square rounded-full flex justify-center items-center ${
                        selectedItemId === prompt.id
                          ? "visible"
                          : "group-hover:visible invisible"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {previousPrompts.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-light">Previous 30 days</h2>
              <div>
                {previousPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className={`py-1 group hover:px-2 w-full flex items-center justify-between transition-all rounded-md cursor-pointer ${
                      selectedItemId === prompt.id
                        ? "bg-gray-200 px-2"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <button
                      className="w-full text-left py-1 truncate overflow-ellipsis"
                      onClick={() => handleClick(prompt.id)}
                    >
                      {prompt.message}
                    </button>
                    <DeleteDialog
                      id={prompt.id}
                      className={`hover:bg-gray-300 h-full aspect-square rounded-full flex justify-center items-center ${
                        selectedItemId === prompt.id
                          ? "visible"
                          : "group-hover:visible invisible"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-white flex flex-col shadow-lg gap-2 rounded-l-3xl p-6 w-4/5 h-full">
          <div className="border rounded-lg p-4 flex-grow overflow-y-auto bg-gray-50">
            <PromptRoom
              setSelectedItemId={setSelectedItemId}
              setMessages={setMessages}
              selectedTab={selectedItemId}
              messages={messages}
            />
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
              disabled={user === null}
            />
            <Button
              type="submit"
              className="ml-2"
              disabled={user === null || inputValue.length === 0}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
