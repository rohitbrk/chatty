import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import { useState } from "react";

const Nav = () => {
  const activeStyles = {
    color: "darkblue",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  };
  const [path, setPath] = useState("/");

  return (
    <>
      <div className="px-6 w-full flex justify-between list-none border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300">
        <div className="justify-start">
          <li>
            <NavLink to="/" className="flex">
              <img
                src="public/chatty-logo.png"
                className="mt-2 h-20 rounded-2xl"
              />
            </NavLink>
          </li>
        </div>
        <div className="mt-7 text-lg flex justify-evenly">
          <li className="mt-1 mr-2 text-blue-400 hover:text-blue-800">
            <NavLink
              to="/"
              style={({ isActive }) => {
                return isActive ? activeStyles : {};
              }}
            >
              Home
            </NavLink>
          </li>
          <li className="mt-1 text-blue-400 hover:text-blue-800">
            {" "}
            <NavLink
              to="/chat"
              style={({ isActive }) => {
                setPath(window.location.pathname);
                return isActive ? activeStyles : {};
              }}
            >
              Chat
            </NavLink>
          </li>
          <li className="text-blue-400 hover:text-blue-800">
            {path === "/" ? <></> : <Profile />}
          </li>
        </div>
      </div>
    </>
  );
};

export default Nav;
