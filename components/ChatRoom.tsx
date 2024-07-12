import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Group } from "@/types/Group";
import { supabase } from "@/lib/supabase";
import BubbleChat from "./BubbleChat";

interface ChatRoomProps {
  group: Group | null;
}

interface Message {
  id: number;
  chat: string;
  created_at: Date;
  sender: number;
  groupId: string;
}

const ChatRoom = ({ group }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (group) {
      const fetchMessages = async () => {
        const { data, error } = await supabase
          .from("group_chats")
          .select("*")
          .eq("groupId", group.id);

        if (error) {
          console.error("Error fetching messages: ", error);
        } else {
          console.log(data);
          setMessages(data);
        }
      };
      fetchMessages();
    }
  }, [group]);

  const handleSendMessage = async () => {
    if (group) {
      if (newMessage.trim() === "") return;

      const { data, error } = await supabase
        .from("group_chats")
        .insert({
          chat: newMessage,
          sender: 2,
          groupId: group.id,
        })
        .select();
      console.log(data);
      if (error) {
        console.error("Error sending message: ", error);
      } else {
        setMessages((prevMessages) => [...prevMessages, data[0]]);
        setNewMessage("");
      }
    }
  };

  if (!group) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-xl font-bold">Select a group first</h2>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-bold">{group.name}</h2>
      <div className="border rounded-lg p-4 flex-grow overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <BubbleChat key={message.id} message={message} />
        ))}
      </div>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button className="ml-2" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </>
  );
};

export default ChatRoom;
