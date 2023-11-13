import { useState } from "react";

const Resources = () => {
  const resources = ["1", "2"];
  const [showResources, setShowResources] = useState(false);

  return (
    <div className="w-full h-auto mt-[150px] mx-4 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300">
      <div className="flex justify-between font-semibold">
        Resources
        {showResources ? (
          <button onClick={() => setShowResources((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button onClick={() => setShowResources((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <>
        {showResources ? (
          <ul className="flex flex-col">
            {resources.map((item) => (
              <li
                key={item}
                className="block text-4xl font-medium leading-tight inline-block whitespace-nowrap rounded-1 bg-primary-100 text-center align-baseline font-bold leading-none text-primary-700"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default Resources;
