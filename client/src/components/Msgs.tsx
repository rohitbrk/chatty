import { useContext } from "react";
import { MsgsContext } from "../context/MsgsContext";
import { UserInfoContext } from "../context/UserInfoContext";

const Msgs = () => {
  const { name } = useContext(UserInfoContext);
  const msgs = useContext(MsgsContext);
  return (
    <div className="flex flex-col flex-grow h-72 overflow-auto w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg hover:shadow-black/30">
      <div className="font-semibold pb-4">Messages</div>
      {msgs.map((item, index) => {
        if (!item.includes(":")) return item;
        const myArray = item.split(" ");
        const myMsgString = item.substring(item.indexOf(":") + 1);
        let flag = false;
        if (name === myArray[0].slice(0, -1)) flag = true;

        if (item.includes("data:image/")) {
          return (
            <div key={index} className="mb-1">
              {flag ? (
                ""
              ) : (
                <span className="m-0 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm text-center px-4 py-1">
                  {myArray[0].slice(0, -1)}
                </span>
              )}
              <img
                src={myArray[1]}
                className={`${
                  flag
                    ? "ml-4 mt-2 rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                    : "mr-4 mt-2 rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                } `}
              />
            </div>
          );
        }
        if (item.includes("data:video/")) {
          return (
            <div key={index} className="mb-1">
              {flag ? (
                ""
              ) : (
                <span className="m-0 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm text-center px-4 py-1">
                  {myArray[0].slice(0, -1)}
                </span>
              )}

              <video
                className={`${
                  flag
                    ? "ml-4 mt-2 rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                    : "mr-4 mt-2 rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                } `}
                controls
                src={myArray[1]}
              />
            </div>
          );
        }
        return (
          <div
            key={index}
            className={`${
              flag ? "mb-1" : "flex w-full mt-1 mb-1 space-x-3 max-w-xs"
            } `}
          >
            <div
              className={`${
                flag
                  ? "bg-blue-600 text-white p-2 rounded-l-lg rounded-br-lg flex w-full mt-1 space-x-2 max-w-xs ml-auto justify-end"
                  : "bg-gray-300 text-black p-2 rounded-r-lg rounded-bl-lg flex w-full mt-1 space-x-2 max-w-xs ml-auto justify-start"
              } `}
            >
              <div>
                {flag ? (
                  ""
                ) : (
                  <span className="m-0 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm text-center px-4 py-1">
                    {myArray[0].slice(0, -1)}
                  </span>
                )}
                <p className="ml-4">{myMsgString}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Msgs;
