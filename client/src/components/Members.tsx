import { useState } from "react";

type MembersProps = { members: String[] };

const Members = ({ members }: MembersProps) => {
  const [showMembers, setShowMembers] = useState(false);
  return (
    <div className="flex flex-col w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg hover:shadow-black/30">
      <div className="flex justify-between font-semibold">
        Members
        {showMembers ? (
          <button onClick={() => setShowMembers((prev) => !prev)}>
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
          <button onClick={() => setShowMembers((prev) => !prev)}>
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
        {showMembers
          ? members.map((item) => (
              <li
                key={item}
                className="text-4xl font-medium leading-tight inline-block whitespace-nowrap rounded-1 bg-primary-100 text-center align-baseline font-bold leading-none text-primary-700"
              >
                {item}
              </li>
            ))
          : ""}
      </>
    </div>
  );
};

export default Members;
