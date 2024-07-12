"use client";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Group } from "@/types/Group";
import { cn } from "@/lib/utils";

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
    <ScrollArea className="h-full w-full">
      <div className="">
        {props.groups.map((group) => (
          <div className="" key={group.id}>
            <div
              onClick={() => handleClick(group)}
              className={cn(
                "text-sm hover:px-2 hover:bg-gray-200 py-3 cursor-pointer transition-all rounded-md",
                props.selectedGroup?.id === group.id && "bg-gray-200 px-2"
              )}
            >
              <p className="font-bold">{group.name}</p>
              <p className="font-light text-xs">{group.topic}</p>
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
