type ChatProps = {
  msg: string;
  setMsg: (msg: string) => void;
  setFile: (file: File) => void;
  sendMsg: () => void;
};

const Chat = ({ msg, setMsg, setFile, sendMsg }: ChatProps) => {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg hover:shadow-black/30">
      <input
        type="text"
        value={msg}
        placeholder="Enter Message"
        onChange={(e) => setMsg(e.target.value)}
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 relative block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:transition file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-400 focus:border-primary focus:text-neutral-700 focus:outline-none dark:border-neutral-600 file:bg-neutral-700 file:text-neutral-100"
      />
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
        onClick={sendMsg}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
