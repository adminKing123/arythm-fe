import { useState } from "react";
import { ArrowSvg } from "../../assets/svg";

const DropDown = ({ value, setValue, options = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (e, option) => {
    setValue(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="relative" onBlur={() => setIsOpen(false)} tabIndex={0}>
      <span
        onClick={() => setIsOpen(true)}
        className="text-sm flex items-center gap-2 hover:text-[#25a56a] cursor-pointer"
      >
        {value?.name || "Select"} <ArrowSvg className="w-5 h-5" />
      </span>
      {isOpen ? (
        <div className="absolute left-0 min-w-[180px] rounded-xl bg-[#222227] shadow-lg mt-2 z-20">
          <ul>
            {options.map((option) => (
              <li
                key={option.id}
                onClick={(e) => handleSelect(e, option)}
                className={`cursor-pointer text-sm px-4 py-[10px] ${
                  value?.id === option.id
                    ? "text-[#25a56a]"
                    : "hover:text-[#25a56a]"
                }`}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
