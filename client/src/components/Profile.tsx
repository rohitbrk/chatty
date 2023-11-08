// @ts-nocheck
import { useContext, useState } from "react";
import { useCusNavigate } from "../hooks/useCusNavigate";
import { cookies } from "../utils/socket.ts";
import { UserInfoContext } from "../context/UserInfoContext.tsx";
import { deleteRoom } from "../utils/socket.js";

const Profile = () => {
  const { name, room } = useContext(UserInfoContext);
  const navigate = useCusNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownElements = [
    {
      name: "Logout",
      onClick: () => {
        cookies.remove("chatty_jwt");
        navigate("/");
        window.location.reload();
      },
    },
    {
      name: "Delete Room",
      onClick: () => {
        deleteRoom();
        navigate("/");
      },
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-md bg-white shadow-md rounded px-8 py-4 hover:shadow-lg hover:shadow-black/30">
      <div className="mb-4 flex justify-end">
        <div className="basis-1/2 gap-2 flex justify-center text-gray-800 bg-gray-300 font-bold py-2 px-3 rounded mr-4">
          {room}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </div>
        <div className="relative inline-block text-left">
          <div className="mr-0">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setDropdown((prev) => !prev)}
            >
              <div className="font-semibold text-base">
                {name ? name : "No User"}
              </div>
              <svg
                className="h-5 w-5 text-gray-500 display-block m-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {dropdown ? (
            <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex flex-col items-center py-1">
                {dropdownElements.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="w-32 block flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
