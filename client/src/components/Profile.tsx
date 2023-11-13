import { useContext, useState } from "react";
import { useCusNavigate } from "../hooks/useCusNavigate";
import { UserInfoContext } from "../context/UserInfoContext.tsx";
import { deleteRoom, getMembers } from "../utils/socket.js";
import { cookies } from "../App.tsx";

const Profile = () => {
  const { name, room } = useContext(UserInfoContext);
  const navigate = useCusNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([]);
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
    {
      name: (
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
          Members
        </div>
      ),
      onClick: async () => {
        const data = await getMembers(room);
        if (data.members) {
          setMembers(data.members);
          setShowMembers((prev) => !prev);
        }
      },
    },
  ];

  return (
    <div className="ml-4 relative inline-block text-left">
      <div className="mr-0">
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => {
            setShowMembers(false);
            setDropdown((prev) => !prev);
          }}
        >
          <div className="font-semibold text-base">
            {name ? `${name} (${room})` : "No User"}
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
      {showMembers ? (
        <div className="absolute right-40 z-20 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col items-center py-1">
            {members.map((item) => (
              <div
                key={item}
                className="w-32 block flex text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
