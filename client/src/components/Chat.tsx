import { useContext } from "react";
import { UserInfoContext } from "../context/UserInfoContext";
import { sendMsg } from "../utils/socket";
import { DataContext, DataDispatchContext } from "../context/DataContext";

const Chat = ({ socket }) => {
  const data = useContext(DataContext);
  const dataDispatch = useContext(DataDispatchContext);
  const { name, room } = useContext(UserInfoContext);

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 hover:shadow-lg hover:shadow-black/30">
      <input
        type="text"
        name="text"
        value={data.text ? data.text : ""}
        placeholder="Enter Message"
        onChange={(e) =>
          dataDispatch({
            type: "SET_TEXT",
            payload: { text: e.target.value },
          })
        }
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        type="file"
        name="file"
        accept="image/png, image/jpeg, video/*"
        onChange={(e) =>
          dataDispatch({
            type: "SET_FILE",
            payload: { file: e.target.files[0] },
          })
        }
        className="focus:ring-4 focus:outline-none focus:ring-gray-500 mb-4 relative block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:transition file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-400 focus:border-primary focus:text-neutral-700 focus:outline-none border-neutral-600 file:bg-neutral-700 file:text-neutral-100"
      />
      <button
        className="w-full items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        onClick={() => sendMsg(socket, name, room, data)}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
