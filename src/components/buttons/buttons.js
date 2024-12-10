const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-[#25a56a] text-white p-3 rounded-xl hover:bg-[#222227] text-center text-sm transition-colors duration-300 disabled:bg-[#222227] disabled:hover:bg-[#222227] ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
