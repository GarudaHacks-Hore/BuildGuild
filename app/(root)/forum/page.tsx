"use client";

import ChatRoom from "@/components/ChatRoom";
import ForumFilter from "@/components/ForumFilter";
import { GroupList } from "@/components/GroupList";
import React, { useState } from "react";

export default function Forum() {
  const groups = [
    { id: "1", name: "Anjay" },
    { id: "2", name: "Anjrot" },
  ];
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <main
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="flex items-center w-full h-full">
        <div className="w-1/5 px-10 py-4 flex flex-col justify-start h-full gap-6">
          <h1 className="text-2xl font-bold mb-2">Forums</h1>
          <ForumFilter />
          <GroupList
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        </div>
        <div className="bg-white flex flex-col shadow-lg gap-2 rounded-l-3xl p-6 w-4/5 h-full">
          <ChatRoom group={selectedGroup} />
        </div>
      </div>
    </main>
  );
}
