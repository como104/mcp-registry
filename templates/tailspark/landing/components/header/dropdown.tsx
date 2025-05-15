import { Menu, Transition } from "@headlessui/react";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Item } from "@/types/landing";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropDownProps {
  navItems?: Item[];
}

export default ({ navItems = [] }: DropDownProps) => {
  const itemsToRender = navItems.length > 0 ? navItems : [
    { title: "Pricing", url: "/pricing" },
    { title: "Feed", url: "/feed" },
    { title: "Extension", url: "/extension" },
    { title: "GPTs", url: "https://chat.openai.com/g/g-EBKM6RsBl-gpts-works", target: "_blank" },
    { title: "Dashboard", url: "/dashboard/my-gpts" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="mt-1.5 flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {itemsToRender.map((item, index) => (
              <Menu.Item key={item.url || item.title || index}>
                {({ active }) => (
                  <a
                    href={item.url}
                    target={item.target}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item.title}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
