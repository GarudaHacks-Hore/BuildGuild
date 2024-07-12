"use client";

import ProjectsFilter from "@/components/ProjectsFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { projects } from "@/constants";
import React, { useState } from "react";

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesWeek = selectedWeek === null || project.week === selectedWeek;

    return matchesSearch && matchesWeek;
  });

  return (
    <main
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="flex items-center w-full h-full">
        <div className="w-1/5 px-10 py-4 flex flex-col justify-start h-full gap-6">
          <h1 className="text-2xl font-bold mb-2">Project Showcase</h1>
          <div className="flex flex-col gap-2 ml-10">
            {[1, 2, 3, 4].map(week => (
              <p
                key={week}
                className={`cursor-pointer ${selectedWeek === week ? 'text-blue-500' : ''}`}
                onClick={() => setSelectedWeek(week)}
              >
                Week {week}
              </p>
            ))}
          </div>
        </div>
        <div className="bg-white flex flex-col shadow-lg gap-2 rounded-l-3xl p-6 w-4/5 h-full">
          <div className="flex items-center gap-3">
            <ProjectsFilter />
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
