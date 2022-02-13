import { Menu, Transition } from "@headlessui/react";
import Avatar from "~/components/Avatar";
import { Fragment } from "react";

interface UserMenuProps {
  userId: string;
  userName: string;
  logout: () => void;
}
const UserMenu = ({ userId, userName, logout }: UserMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center px-4 py-2 ">
        <div className="-mr-1">
          <Avatar
            src={`https://avatars.dicebear.com/api/personas/${userId}.svg?size=50`}
          />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item disabled>
              <p
                className={` group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold text-gray-900`}
              >
                {userName}
              </p>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-black text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Account
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <form action="/logout" method="post">
                  <button
                    className={`${
                      active ? "bg-black text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    type="submit"
                  >
                    Logout
                  </button>
                </form>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default UserMenu;
