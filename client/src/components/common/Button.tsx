type ButtonProps = {
  name: string;
  onClick: () => void;
  component: string;
};
const Button = ({ name, onClick, component }: ButtonProps) => {
  let className = "";
  switch (component) {
    case "profile":
      className =
        "w-32 block flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2";
      break;
    case "chat":
      className =
        "w-full items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300";
      break;
    case "room":
      className =
        "inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300";
      break;
  }
  return (
    <button onClick={onClick} className={className}>
      {name}
    </button>
  );
};

export default Button;
