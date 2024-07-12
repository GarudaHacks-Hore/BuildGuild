"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { FaRegUserCircle, FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/auth-js";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const [user, setUser] = useState<User>();
  const [isGetUser, setIsGetUser] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data.user);
        setIsGetUser(true);
      }
    };
    getUser();
  }, []);

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
        {user && isGetUser ? (
          <MenuItem
            leftIcon={<FaRegUserCircle className="mr-1" size={20} />}
            setActive={setActive}
            active={active}
            item={user.user_metadata.username}
          >
            <div className='flex flex-col space-y-4 text-sm'>
              <HoveredLink href='/profile'>My Profile</HoveredLink>
              <HoveredLink href='/sign-out'>Log Out</HoveredLink>
            </div>
          </MenuItem>
        ) : !isGetUser ? (
          <div></div>
        ) : (
          <>
            <HoveredLink href="/sign-in">Login</HoveredLink>
            <HoveredLink
              className="bg-black text-white py-2 px-3 rounded-md hover:text-gray-200"
              href="/sign-up"
            >
              Register
            </HoveredLink>
          </>
        )}
      </Menu>
    </div>
  );
}
