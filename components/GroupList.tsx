"use client";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Group } from "@/types/Group";
import { group } from "console";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `Group ${a.length - i}`
);

interface GroupListProps {
  groups: Group[];
  selectedGroup: Group | null;
  setSelectedGroup: React.Dispatch<React.SetStateAction<any>>;
}

export function GroupList(props: GroupListProps) {
  const handleClick = (group: Group) => {
    props.setSelectedGroup(group);
  };
  return (
    <ScrollArea className="h-full rounded-md w-full">
      <div className="">
        {props.groups.map((group) => (
          <div key={group.id}>
            <div
              onClick={() => handleClick(group)}
              className="text-sm py-3 cursor-pointer"
            >
              {group.name}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
