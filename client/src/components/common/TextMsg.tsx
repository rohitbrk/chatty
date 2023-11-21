type TextMsgProps = {
  index: number;
  flag: boolean;
  myArray: string[];
  myMsgString: string;
};
const TextMsg = ({ index, flag, myArray, myMsgString }: TextMsgProps) => {
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
};

export default TextMsg;
