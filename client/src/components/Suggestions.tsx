import { useState } from "react";
import svgs from "../utils/svgs";

type SuggestionsProps = {
  name: string;
  items: string[];
  svg: string;
  button: boolean;
};
const Suggestions = ({ name, items, svg, button }: SuggestionsProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="w-full h-auto mt-[150px] mx-4 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300">
      <div className="flex justify-between font-semibold">
        <div className="flex">
          {svg}
          {name}
        </div>

        {showSuggestions ? (
          <button onClick={() => setShowSuggestions((prev) => !prev)}>
            {svgs.dropdownTrue}
          </button>
        ) : (
          <button onClick={() => setShowSuggestions((prev) => !prev)}>
            {svgs.dropdownFalse}
          </button>
        )}
      </div>
      <>
        {showSuggestions ? (
          <ul className="flex flex-col">
            {items?.map((item) => (
              <li
                key={item}
                className="px-6 mx-20 flex justify-between mb-1 block text-lg font-medium leading-tight inline-block whitespace-nowrap rounded-1 bg-primary-100 align-baseline font-bold leading-none text-gray-700"
              >
                <>{item}</>
                {button ? (
                  <button
                    onClick={() =>
                      window.alert("Enter desired room name and click on join")
                    }
                    className="ml-4 flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2.5 py-1 text-center ml-2 mb-2"
                  >
                    join
                  </button>
                ) : (
                  ""
                )}
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

export default Suggestions;
