const Msgs = ({ msgs }) => {
  return (
    <div className="flex flex-col w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg hover:shadow-black/30">
      <div className="font-semibold pb-4">Messages</div>
      {msgs.map((item, index) => {
        const myArray = item.split(" ");
        if (item.includes("data:image/png;base64")) {
          return (
            <div key={index}>
              <p className="text-m font-semibold text-gray-700">{myArray[0]}</p>
              <img
                src={myArray[1]}
                className="rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
              />
            </div>
          );
        }
        if (item.includes("data:video/mp4;base64")) {
          return (
            <div key={index}>
              <p className="text-m font-semibold text-gray-700">{myArray[0]}</p>
              <video
                className="rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                controls
                src={myArray[1]}
              />
            </div>
          );
        }
        return (
          <p
            key={index}
            className="inline-block bg-gray-100 rounded-lg px-3 py-1 text-m font-semibold text-gray-700 mr-2 mb-2"
          >
            {item}
          </p>
        );
      })}
    </div>
  );
};

export default Msgs;
