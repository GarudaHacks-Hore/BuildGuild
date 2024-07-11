"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("bg-black inset-x-0 z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Play">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/lobby">Lobby</HoveredLink>
            <HoveredLink href="/all-contest">All Contest</HoveredLink>
            <HoveredLink href="/write-contest">Write Contest</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Community">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/leaderboards">Leaderboards</HoveredLink>
            <HoveredLink href="/winners">Winners</HoveredLink>
            <HoveredLink href="/discord">Discord</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Train">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/problem">Problem</HoveredLink>
            <HoveredLink href="/problem-otd">Problem of the Day</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
