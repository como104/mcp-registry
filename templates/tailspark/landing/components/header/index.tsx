"use client";

import React from 'react';
import { BsGithub, BsTwitter } from "react-icons/bs";
import { Header, Item } from "@/types/landing";

import DropDown from "./dropdown";
import { usePathname } from "next/navigation";
import Search from "../search";

export default ({
  header,
  showSearch,
  searchQuery,
}: {
  header: Header;
  showSearch?: boolean;
  searchQuery?: string;
}) => {
  const pathname = usePathname();

  // Filter out the Discord item from nav items
  const navItems = header?.nav?.items?.filter(
    (item) => item.title !== "Discord"
  ) || [];

  return (
    <header className="w-full bg-gray-200 shadow-sm">
      <div className="mx-auto max-w-[90rem] px-2 md:px-4 mt-4 md:mt-4">
        <div className="flex items-center justify-between">
          <p className="text-lg md:text-3xl font-medium">
            <a
              className="flex items-center bg-cover bg-center py-3 px-2 md:py-4 text-primary cursor-pointer font-bold"
              href={header?.brand?.url}
            >
              <img
                src={header?.brand?.avatar?.src}
                alt={header?.brand?.avatar?.title || header?.brand?.title}
                className="w-10 h-10 rounded-full border-2 border-slate-300 shadow-lg mr-2"
              />
              {header?.brand?.title}
            </a>
          </p>

          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="mr-4">
                <Search query={searchQuery} compact={true} />
              </div>
            )}
            <ul className="hidden md:flex items-center text-lg text-slate-700">
              {navItems.map((item: Item, idx: number) => {
                const itemKey = item.url || item.title || `nav-item-${idx}`;
                return (
                  <li className="mx-4" key={itemKey}>
                    <a
                      href={item.url}
                      target={item.target}
                      className={
                        pathname === item.url
                          ? "text-primary"
                          : "hover:text-primary"
                      }
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            
            {/* <div className="hidden md:block ml-4">
              <a href="/dashboard/my-gpts" className="hover:text-primary">Dashboard</a>
            </div> */}
          </div>

          <div className="md:hidden flex items-center">
            <DropDown navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
};
