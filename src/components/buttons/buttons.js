const Button = ({ children, varient = "primary", className, ...props }) => {
  const varients = {
    primary:
      "text-white bg-[#25a56a] hover:bg-[#222227] disabled:bg-[#222227] disabled:hover:bg-[#222227] rounded-xl text-center text-sm transition-colors duration-300 p-3",
    secondary:
      "text-white bg-[#222227] hover:bg-[#25a56a] disabled:bg-[#222227] disabled:hover:bg-[#222227] rounded-xl text-center text-sm transition-colors duration-300 p-3",
  };

  return (
    <button className={`${varients[varient]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
