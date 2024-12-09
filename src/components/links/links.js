const A = ({ className, ...props }) => {
  return (
    <a
      {...props}
      className={`text-[#25a564] ${className ?? ""} hover:underline`}
    ></a>
  );
};

export default A;
