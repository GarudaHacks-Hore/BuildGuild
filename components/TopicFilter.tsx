"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabase";
import { Group } from "@/types/Group";
import { Topic } from "@/types/Topic";

interface TopicFilterProps {
  setFilteredGroups: React.Dispatch<React.SetStateAction<any>>;
  groups: Group[];
}

export default function TopicFilter({
  setFilteredGroups,
  groups,
}: TopicFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    async function fetchTopics() {
      const { data, error } = await supabase.from("topics").select("*");
      if (error) {
        console.error("Error fetching topics: ", error);
      } else {
        setTopics(data);
      }
    }
    fetchTopics();
  }, []);

  const handleFilterChange = (currentValue: string) => {
    let updatedTopics;
    if (selectedTopics.includes(currentValue)) {
      updatedTopics = selectedTopics.filter((topic) => topic !== currentValue);
    } else {
      updatedTopics = [...selectedTopics, currentValue];
    }
    setSelectedTopics(updatedTopics);

    if (updatedTopics.length === 0) {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter((group) =>
        updatedTopics.includes(group.topic)
      );
      setFilteredGroups(filtered);
    }

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
        <p className="font-bold">Topic:</p>
        <PopoverTrigger className="flex flex-grow" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedTopics.length === 0
              ? "All"
              : selectedTopics
                  .map((topic) => topics.find((t) => t.name === topic)?.name)
                  .join(", ")}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Filter by topic..." />
          <CommandEmpty>No topic found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {topics.map((topic) => (
                <CommandItem
                  key={topic.id}
                  value={topic.name}
                  onSelect={() => handleFilterChange(topic.name)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTopics.includes(topic.name)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {topic.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
