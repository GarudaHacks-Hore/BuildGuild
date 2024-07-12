"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { FaRegUserCircle, FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex justify-around items-center bg-white inset-x-0 z-50 border-b-2 h-20",
        className
      )}
    >
      <Menu setActive={setActive}>
        <HoveredLink className="font-bold text-xl" href="/">
          BuildGuild
        </HoveredLink>
      </Menu>
      <Menu setActive={setActive}>
        <HoveredLink
          className={`hover:underline underline-offset-4 ${
            pathname === "/" ? "font-bold underline" : ""
          }`}
          onMouseEnter={() => setActive(null)}
          href="/"
        >
          Home
        </HoveredLink>
        <HoveredLink
          className={`hover:underline underline-offset-4 ${
            pathname === "/discover" ? "font-bold underline" : ""
          }`}
          onMouseEnter={() => setActive(null)}
          href="/discover"
        >
          Discover
        </HoveredLink>
        <HoveredLink
          className={`hover:underline underline-offset-4 ${
            pathname === "/showcase" ? "font-bold underline" : ""
          }`}
          onMouseEnter={() => setActive(null)}
          href="/showcase"
        >
          Showcase
        </HoveredLink>
        <HoveredLink
          className={`hover:underline underline-offset-4 ${
            pathname === "/communities" ? "font-bold underline" : ""
          }`}
          onMouseEnter={() => setActive(null)}
          href="/communities"
        >
          Communities
        </HoveredLink>
        {/* <MenuItem setActive={setActive} active={active} item="Community">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/forum">Forum</HoveredLink>
            <HoveredLink href="/leaderboard">Leaderboard</HoveredLink>
            <HoveredLink href="/hall-of-fame">Hall of Fame</HoveredLink>
          </div>
        </MenuItem> */}
      </Menu>
      <Menu className="flex items-center z-50" setActive={setActive}>
        <MenuItem
          leftIcon={<FaRegUserCircle className="mr-1" size={20} />}
          setActive={setActive}
          active={active}
          item="Ceavin"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/profile">My Profile</HoveredLink>
            <HoveredLink href="/account">Account</HoveredLink>
            <HoveredLink href="/logout">Logout</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
