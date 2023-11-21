import { useContext, useState } from "react";
import { useCusNavigate } from "../hooks/useCusNavigate";
import { UserInfoContext } from "../context/UserInfoContext.tsx";
import { deleteRoom, getMembers } from "../utils/socket.js";
import { cookies } from "../App.tsx";
import svgs from "../utils/svgs.tsx";
import Button from "./common/Button.tsx";

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
          {svgs.showMembersArrow}
          Members
        </div>
      ),
      onClick: async () => {
        if (showMembers) return setShowMembers(false);
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
          {svgs.profileDropdownArrow}
        </button>
      </div>
      {dropdown ? (
        <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col items-center py-1">
            {dropdownElements.map((item) => (
              <Button
                name={item.name}
                onClick={item.onClick}
                component="profile"
              />
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
