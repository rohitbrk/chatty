const ImageMsg = ({ index, flag, myArray }) => {
  return (
    <div
      key={index}
      className={`${flag ? "flex justify-end ml-28" : ""} mb-1 w-4/5`}
    >
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
            ? "mt-2 rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            : "mt-2 rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
        } `}
      />
    </div>
  );
};

export default ImageMsg;
