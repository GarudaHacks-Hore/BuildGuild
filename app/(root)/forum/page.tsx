"use client";

import ChatRoom from "@/components/ChatRoom";
import ForumFilter from "@/components/ForumFilter";
import { GroupList } from "@/components/GroupList";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Group } from "@/types/Group";

export default function Forum() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  useEffect(() => {
    async function fetchGroups() {
      const { data, error } = await supabase.from("groups").select("*");
      if (error) {
        console.error("Error fetching groups: ", error);
      } else {
        setGroups(data);
        setFilteredGroups(data);
      }
    }
    fetchGroups();
  }, []);

  return (
    <main
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="flex items-center w-full h-full">
        <div className="w-1/5 px-10 py-4 flex flex-col justify-start h-full gap-6">
          <h1 className="text-2xl font-bold mb-2">Forums</h1>
          <ForumFilter setFilteredGroups={setFilteredGroups} groups={groups} />
          <GroupList
            groups={filteredGroups}
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
