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

const tags = [
  {
    value: "Technology",
    label: "Technology",
  },
  {
    value: "Environment",
    label: "Environment",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "Health",
    label: "Health",
  },
  {
    value: "Transportation",
    label: "Transportation",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Agriculture",
    label: "Agriculture",
  }
];

interface ProjectsFilterProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProjectsFilter({ selectedTags, setSelectedTags }: ProjectsFilterProps) {
  const [open, setOpen] = React.useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags: string[]) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
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
          <span className="truncate">
            {selectedTags.length > 0
              ? selectedTags.map((tag: string) => tags.find((t) => t.value === tag)?.label).join(", ")
              : "Filter projects..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Filter projects..." />
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.value}
                  value={tag.value}
                  onSelect={() => {
                    toggleTag(tag.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTags.includes(tag.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tag.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
