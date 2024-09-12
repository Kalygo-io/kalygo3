"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { navigation } from "@/config/navigation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logoutRequest } from "@/services/logoutRequest";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userNavigation = [
    {
      name: "Sign out",
      onClick: async () => {
        await logoutRequest();
        setSidebarOpen(false);
        router.push("/");
      },
    },
  ];

  const segments = pathname.split("/");
  const current = segments[segments.length - 1];

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-4 cursor-pointer">
                <div
                  className="flex h-16 shrink-0 items-center"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <span className="text-white text-lg font-semibold">🌴</span>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <span
                              onClick={() => {
                                router.push(item.href);
                                setSidebarOpen(false);
                              }}
                              className={classNames(
                                item.href.split("/")[
                                  item.href.split("/").length - 1
                                ] === current
                                  ? "bg-purple-700 text-white"
                                  : "text-white hover:text-white hover:bg-purple-700",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.href.split("/")[
                                    item.href.split("/").length - 1
                                  ] === current
                                    ? "text-white"
                                    : "text-white group-hover:text-white",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <ul className="mt-auto space-y-1">
                      {/* <li>
                        <span
                          onClick={() => {
                            router.push("/dashboard/settings");
                            setSidebarOpen(false);
                          }}
                          className={classNames(
                            "settings" === current
                              ? "bg-purple-700 text-white"
                              : "text-white hover:text-white hover:bg-purple-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                          )}
                        >
                          <Cog6ToothIcon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                          />
                          Settings
                        </span>
                      </li> */}
                      <li>
                        <span
                          onClick={async () => {
                            await logoutRequest();
                            setSidebarOpen(false);
                            router.push("/");
                          }}
                          className={classNames(
                            "cursor-pointer text-white hover:text-white hover:bg-purple-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <ArrowLeftStartOnRectangleIcon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                          />
                          Sign out
                        </span>
                      </li>
                    </ul>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-4">
            <div
              className="flex h-16 shrink-0 items-center cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              <span className="text-white text-3xl">🌴</span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.href.split("/")[
                              item.href.split("/").length - 1
                            ] === current
                              ? "bg-purple-700 text-white"
                              : "text-white hover:text-white hover:bg-purple-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.href.split("/")[
                                item.href.split("/").length - 1
                              ] === current
                                ? "text-white"
                                : "text-white group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <ul className="space-y-1">
                {/* <li>
                  <Link
                    href="/dashboard/settings"
                    className={classNames(
                      "settings" === current
                        ? "bg-purple-700 text-white"
                        : "text-white hover:text-white hover:bg-purple-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                    />
                    Settings
                  </Link>
                </li> */}
                <li>
                  <span
                    onClick={async () => {
                      await logoutRequest();
                      router.push("/");
                    }}
                    className={classNames(
                      "cursor-pointer text-white hover:text-white hover:bg-purple-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <ArrowLeftStartOnRectangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                    />
                    Sign out
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div
            id="dashboard-sticky-top-nav"
            className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-900 bg-black text-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
          >
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 justify-end lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold leading-6"
                      >
                        Account
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <span
                          onClick={item.onClick}
                          className="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                        >
                          {item.name}
                        </span>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
