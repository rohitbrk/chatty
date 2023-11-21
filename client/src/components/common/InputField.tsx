type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  onChange: () => void;
};
const InputField = ({ name, type, placeholder, onChange }: InputFieldProps) => {
  return (
    <div key={name}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};
export default InputField;
