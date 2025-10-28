"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Heading } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/home", label: "Home" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-5 px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Título */}
          <Heading size="3" className="text-rose-600 font-bold">
            MyApp
          </Heading>

          {/* Links de navegación */}
          <ul className="flex items-center space-x-6 text-gray-700 font-medium">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-all duration-200 px-2 py-1 ${isActive
                        ? "text-rose-600 border-b-2 border-rose-600"
                        : "hover:text-rose-600"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {/* Dropdown de usuario */}
            {session?.user ? (
              <li>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="flex items-center gap-2 bg-white text-rose-700 px-3 py-1.5 rounded-lg font-medium border border-rose-200 hover:bg-rose-50 transition-all duration-200 shadow-sm">
                      <Avatar
                        src={session.user.image || undefined}
                        fallback={session.user.name?.[0]?.toUpperCase() || "A"}
                        className="h-7 w-7 rounded-full ring-2 ring-rose-200"
                      />
                      <span className="hidden sm:inline">{session.user.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-rose-500"
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
                    <DropdownMenu.Item
                      className="px-4 py-2 text-gray-700 text-sm hover:bg-rose-50 hover:text-rose-600 cursor-pointer transition-colors duration-150"
                    >
                      Profile
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-rose-300 mx-3 my-1" />

                    <DropdownMenu.Item
                      onClick={() => signOut()}
                      className="px-4 py-2 text-gray-700 text-sm hover:bg-rose-50 hover:text-rose-600 cursor-pointer transition-colors duration-150"
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
                        ? "text-rose-600 border-b-2 border-rose-600"
                        : "hover:text-rose-600"
                      }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className={`px-2 py-1 ${pathname === "/auth/register"
                        ? "text-rose-600 border-b-2 border-rose-600"
                        : "hover:text-rose-600"
                      }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}
