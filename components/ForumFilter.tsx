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

interface ForumFilterProps {
  setFilteredGroups: React.Dispatch<React.SetStateAction<any>>;
  groups: Group[];
}

export default function ForumFilter({
  setFilteredGroups,
  groups,
}: ForumFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
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
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    if (currentValue === value) {
      setFilteredGroups(groups);
    } else if (currentValue == "All") {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter((group) => group.topic === currentValue);
      setFilteredGroups(filtered);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? value === "All"
              ? "All"
              : topics.find((topic) => topic.name === value)?.name
            : "Filter forum..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Filter forum..." />
          <CommandEmpty>No forum found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem value={"All"} onSelect={handleFilterChange}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "All" ? "opacity-100" : "opacity-0"
                  )}
                />
                All
              </CommandItem>
              {topics.map((topic) => (
                <CommandItem
                  key={topic.id}
                  value={topic.name}
                  onSelect={handleFilterChange}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === topic.name ? "opacity-100" : "opacity-0"
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
