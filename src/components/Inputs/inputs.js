const Input = ({ className, ...props }) => {
  return (
    <input
      className={`bg-[#222227] rounded-xl py-3 px-4 outline-none focus:outline-[#25A56A] w-full ${
        className ?? ""
      }`}
      {...props}
    ></input>
  );
};

export default Input;
