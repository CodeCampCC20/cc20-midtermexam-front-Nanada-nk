/** @format */



function InputForm({
  error,
  handleChange,
  value,
  placeholder,
  type,
  name
}) {
  return (
    <>
      <input
        className={`bg-pink-50 rounded-2xl w-full text-sm p-2 ${error ? "outline-1 outline-red-500" : "outline-0"}`}
        name={name}
        onChange={handleChange}
        value={value}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </>
  );
}

export default InputForm;
