import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Group } from "@/types/Group";

interface ChatRoomProps {
  group: Group | null;
}
const ChatRoom = (props: ChatRoomProps) => {
  if (props.group == null) return;
  return (
    <>
      <h2 className="font-bold">{props.group.name}</h2>
      <div className="border rounded-lg p-4 flex-grow overflow-y-auto bg-gray-50">
        {/* Chat messages will go here */}
      </div>
      <div className="flex items-center">
        <Input type="text" placeholder="Type your message..." />
        <Button className="ml-2">Send</Button>
      </div>
    </>
  );
};

export default ChatRoom;
