const Msgs = ({ name, msgs }) => {
  return (
    <div className="flex flex-col w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg hover:shadow-black/30">
      <div className="font-semibold pb-4">Messages</div>
      {msgs.map((item, index) => {
        const myArray = item.split(" ");
        let flag = false;
        if (name === myArray[0].slice(0, -1)) flag = true;

        if (item.includes("data:image/png;base64")) {
          return (
            <div key={index}>
              {flag ? (
                ""
              ) : (
                <p className="text-m font-semibold text-gray-700">
                  {myArray[0]}
                </p>
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
        if (item.includes("data:video/mp4;base64")) {
          return (
            <div key={index}>
              {flag ? (
                ""
              ) : (
                <p className="text-m font-semibold text-gray-700">
                  {myArray[0]}
                </p>
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
            className={`${flag ? "" : "flex w-full mt-2 space-x-3 max-w-xs"} `}
          >
            <div
              className={`${
                flag
                  ? "bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                  : "bg-gray-300 text-black p-3 rounded-r-lg rounded-bl-lg flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-start"
              } `}
            >
              <div>
                {flag ? "" : myArray[0]}
                <p>{myArray[1]}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Msgs;
