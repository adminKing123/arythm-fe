import { Link } from "react-router-dom";

const A = ({ href, className, ...props }) => {
  return (
    <Link
      {...props}
      to={href}
      className={`text-[#25a564] hover:underline ${className ?? ""}`}
    ></Link>
  );
};

export default A;
