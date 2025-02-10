import { SearchSvg } from "../../assets/svg";

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

export const TextArea = ({ className, ...props }) => {
  return (
    <textarea
      className={`bg-[#222227] rounded-xl py-3 px-4 outline-none focus:outline-[#25A56A] w-full ${
        className ?? ""
      }`}
      {...props}
    ></textarea>
  );
};

export const SearchInput = ({ ...props }) => {
  return (
    <div className="relative w-full">
      <input
        className="h-10 w-full bg-[#222227] rounded-xl pl-5 pr-12 focus:outline-none text-white placeholder:text-[#c0c0c0]"
        placeholder="Search..."
        {...props}
      ></input>
      <div className="absolute top-0 right-0 h-full flex items-center mr-5">
        <SearchSvg className="fill-white w-5 h-5" />
      </div>
    </div>
  );
};

export default Input;
