const Button = ({ name, onChange }) => {
  return (
    <button
      onClick={onChange}
      className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    >
      {name}
    </button>
  );
};

export default Button;
