"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heading, Button } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = session?.user
    ? [{ href: "/dashboard", label: "Dashboard" }]
    : [{ href: "/", label: "Home" }];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-5 px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Heading size="3" className="text-blue-600 font-bold">
            MyApp
          </Heading>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-all duration-200 px-2 py-1 ${isActive
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "hover:text-blue-600"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {session?.user ? (
              <li>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="flex items-center gap-2 bg-white text-blue-700 px-3 py-1.5 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-all duration-200 shadow-sm">
                      <span className="hidden sm:inline">
                        {session.user.name}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content
                    className="bg-white rounded-xl shadow-lg mt-2 py-2 w-44 border border-gray-100"
                    sideOffset={6}
                    align="end"
                  >
                    <DropdownMenu.Item className="px-4 py-2 text-gray-700 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150">
                      Profile
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-blue-300 mx-3 my-1" />

                    <DropdownMenu.Item
                      onClick={() => signOut()}
                      className="px-4 py-2 text-gray-700 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150"
                    >
                      Logout
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className={`px-2 py-1 ${pathname === "/auth/login"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "hover:text-blue-600"
                      }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className={`px-2 py-1 ${pathname === "/auth/register"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "hover:text-blue-600"
                      }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-blue-600 focus:outline-none"
            >
              {menuOpen ? (
                <Cross1Icon className="w-6 h-6" />
              ) : (
                <HamburgerMenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden absolute top-full right-0 left-0 bg-white shadow-lg z-50 flex flex-col mt-0 py-2 text-gray-700 font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 ${pathname === link.href ? "text-blue-600 font-bold" : "hover:text-blue-600"
                    }`}
                  onClick={() => setMenuOpen(false)} // cierra el menú al click
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {session?.user ? (
              <>
                <li className="px-4 py-2 border-t border-gray-200">{session.user.name}</li>
                <li
                  className="px-4 py-2 hover:text-blue-600 cursor-pointer"
                  onClick={() => {
                    signOut();
                    setMenuOpen(false); // cierra el menú al salir
                  }}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className={`block px-4 py-2 ${pathname === "/auth/login" ? "text-blue-600 font-bold" : "hover:text-blue-600"
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className={`block px-4 py-2 ${pathname === "/auth/register" ? "text-blue-600 font-bold" : "hover:text-blue-600"
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}

      </div>
    </nav>
  );
}
