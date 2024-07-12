import React, { useEffect, useState } from "react";
import BubbleChat from "./BubbleChat";
import { Message } from "@/types/Message";
import { InfiniteMovingButtons } from "./ui/infinite-moving-buttons";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { User } from "@supabase/auth-js";

const PromptRoom = ({
  selectedTab,
  messages,
  setMessages,
  setSelectedItemId,
}: {
  selectedTab: string | null;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<any>>;
  setSelectedItemId: (id: string) => void;
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user as User);
    };
    fetchUser();
  }, []);

  const handleSendMessage = async (message: string) => {
    if (user) {
      let data, error;
      ({ data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", user.email));

      if (error || !data) {
        return;
      }

      const realMessage = "Find me " + message.toLowerCase();

      ({ data, error } = await supabase
        .from("prompt_histories")
        .insert({ user: data[0].id, message: realMessage })
        .select("*"));

      if (error || !data) {
        console.error("Error insert prompt histories: ", error);
        return;
      } else {
        const { data: newMsgData, error: newMsgError } = await supabase
          .from("prompts")
          .insert({ chat: realMessage, roomId: data[0].id, role: "user" })
          .select("*");

        if (newMsgError) {
          console.error("Error insert prompt histories: ", newMsgError);
          return;
        } else {
          setSelectedItemId(data[0].id);
          setMessages(newMsgData ? newMsgData : []);
          const response = await axios.post(
            "http://192.168.177.120:8000/find",
            {
              prompt: realMessage,
              identifier: data[0].id,
            }
          );

          // LLM
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
    }
  };

  const prompts1 = [
    {
      id: 0,
      text: "Who can help me build a PC?",
    },
    {
      id: 1,
      text: "Who plays Jazz music?",
    },
    {
      id: 2,
      text: "Find me some social media expert",
    },
    {
      id: 3,
      text: "Who likes hiking?",
    },
    {
      id: 4,
      text: "Find me some blockchain developer",
    },
    {
      id: 5,
      text: "Who likes travelling?",
    },
    {
      id: 6,
      text: "Who is interested in pop music?",
    },
    {
      id: 7,
      text: "Who can play piano for my wedding?",
    },
    {
      id: 8,
      text: "Who likes bowling?",
    },
    {
      id: 9,
      text: "What do you know about Ceavin?",
    },
  ];

  return (
    <>
      {selectedTab ? (
        messages.map((message) => (
          <BubbleChat key={message.id} message={message} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h2 className="text-xl font-bold">
            What kind of person you want to find?
          </h2>
          <div className="flex gap-2">
            <button
              className="hover:bg-gray-100 transition-all w-[200px] h-[100px] p-5 border-2"
              onClick={(e) => handleSendMessage(e.currentTarget.innerText)}
            >
              A tech savvy
            </button>
            <button
              className="hover:bg-gray-100 transition-all w-[200px] h-[100px] p-5 border-2"
              onClick={(e) => handleSendMessage(e.currentTarget.innerText)}
            >
              Someone who loves making music
            </button>
            <button
              className="hover:bg-gray-100 transition-all w-[200px] h-[100px] p-5 border-2"
              onClick={(e) => handleSendMessage(e.currentTarget.innerText)}
            >
              Someone who can do taekwondo
            </button>
            <button
              className="hover:bg-gray-100 transition-all w-[200px] h-[100px] p-5 border-2"
              onClick={(e) => handleSendMessage(e.currentTarget.innerText)}
            >
              Foodist
            </button>
          </div>
          <h3 className="p-0">or you can try these</h3>
          <InfiniteMovingButtons
            items={prompts1}
            direction="right"
            speed="slow"
          />
        </div>
      )}
    </>
  );
};

export default PromptRoom;
