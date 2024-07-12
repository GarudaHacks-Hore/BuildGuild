"use client";

import ProjectsFilter from "@/components/ProjectsFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { projects } from "@/constants";
import React, { useState } from "react";

export default function Showcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeek, setSelectedWeek] = useState<number | null>(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesWeek = selectedWeek === null || project.week === selectedWeek;

    const matchesTags = selectedTags.length === 0 || (project.tags || []).some(tag => selectedTags.includes(tag));

    return matchesSearch && matchesWeek && matchesTags;
  });

  return (
    <main
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="flex items-center w-full h-full">
        <div className="w-1/5 px-10 py-4 flex flex-col justify-start h-full gap-6">
          <h1 className="text-2xl font-bold mb-2">Project Showcase</h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-light">Weeks</h2>
            <div className="flex flex-col gap-1">
              {[1, 2, 3, 4].map((week) => (
                <button
                  key={week}
                  className={`text-left hover:px-2 py-1 hover:bg-gray-200 transition-all rounded-md cursor-pointer ${
                    selectedWeek === week ? "bg-gray-200 px-2" : ""
                  }`}
                  onClick={() => setSelectedWeek(week)}
                >
                  Week {week}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col shadow-lg gap-2 rounded-l-3xl p-6 w-4/5 h-full">
          <div className="flex items-center gap-2">
            <ProjectsFilter selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            <div className="flex flex-grow items-center gap-2">
              <Input
                type="text"
                placeholder="Search project"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={() => setSearchQuery("")}>Clear</Button>
            </div>
          </div>
          <div>
            <ParallaxScroll projects={filteredProjects} />
          </div>
        </div>
      </div>
    </main>
  );
}
