type VideoMsgProps = { index: number; flag: boolean; myArray: string[] };
const VideoMsg = ({ index, flag, myArray }: VideoMsgProps) => {
  return (
    <div key={index} className="mb-1 w-4/5">
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
            ? "ml-[120px] mt-2 rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            : "mr-4 mt-2 rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
        } `}
        controls
        src={myArray[1]}
      />
    </div>
  );
};

export default VideoMsg;
