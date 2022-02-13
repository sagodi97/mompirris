import { Link, NavLink, useLocation } from "remix";
import { useState } from "react";
import UserMenu from "./userMenu";
import { User } from "@prisma/client";
import { NAVBAR_HEIGHT } from "~/constants";

interface NavbarProps {
  user: User;
  logout: () => void;
}

const Navbar = ({ user, logout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav
      className="relative flex-initial bg-white"
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* <!-- Website Logo --> */}
              <Link
                to={user ? "/feed" : "/"}
                className="flex items-center py-4 px-2"
              >
                <p className="font-logo text-2xl font-black">MOMPIRRIS</p>
              </Link>
            </div>
            {/* <!-- Primary Navbar items --> */}
            <div className="hidden items-center space-x-10 md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-black"
                    : "py-4 px-2 font-light text-black"
                }
              >
                Home
              </NavLink>
              {user && (
                <NavLink
                  to="/feed"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-black"
                      : "py-4 px-2 font-light text-black"
                  }
                >
                  Feed
                </NavLink>
              )}
            </div>
          </div>
          {/* <!-- Secondary Navbar items --> */}
          <div className="hidden items-center space-x-3 md:flex ">
            {!user ? (
              pathname !== "/login" ? (
                <Link to="/login" className="btn-primary btn-m">
                  Login
                </Link>
              ) : (
                <></>
              )
            ) : (
              <UserMenu
                userId={user.id}
                userName={user.username ?? "User"}
                logout={logout}
              />
            )}
          </div>
          {/* <!-- Mobile menu button --> */}
          <div className="flex items-center md:hidden">
            <button
              className="mobile-menu-button outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <!-- mobile menu --> */}
      {/* <div className="block md:hidden"> */}
      <div
        className={`translate-x-100 width-full mobile-menu absolute z-50 transform duration-500 ease-in-out md:hidden ${
          !isMenuOpen ? "translate-x-full transform" : ""
        }`}
      >
        <ul className="bg-white">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "font-bold"
                  : "block w-screen px-2 py-4 text-sm font-light text-black hover:bg-black hover:text-white"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            {user && (
              <NavLink
                to="/feed"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold"
                    : "block w-screen px-2 py-4 text-sm font-light text-black hover:bg-black hover:text-white"
                }
              >
                Feed
              </NavLink>
            )}
            {user ? (
              <button
                className="block w-screen px-2 py-4 text-left text-sm font-light text-black hover:bg-black hover:text-white"
                onClick={logout}
              >
                Logout
              </button>
            ) : pathname !== "/login" ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold"
                    : "block w-screen px-2 py-4 text-sm font-light text-black hover:bg-black hover:text-white"
                }
              >
                Login
              </NavLink>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
