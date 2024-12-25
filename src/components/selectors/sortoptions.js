import { useEffect, useRef, useState } from "react";

const SortOptions = ({ options }) => {
  const sliderRef = useRef(null);
  const firstOptionBtnRef = useRef(null);

  const [option, setOption] = useState(options[0]);

  const handleClick = (e, item) => {
    const selectedButton = e.target;
    sliderRef.current.style.transform = `translateX(${selectedButton.offsetLeft}px)`;
    sliderRef.current.style.width = `${selectedButton.offsetWidth}px`;
    setOption(item);
  };

  useEffect(() => {
    firstOptionBtnRef.current?.click();
  }, [firstOptionBtnRef]);

  return (
    <div className="h-10 bg-[#222227] flex items-center rounded-xl relative">
      <div
        ref={sliderRef}
        className="h-[30px] absolute top-[5px] bg-[#25a56a] rounded-[10px] transition-all duration-200"
      ></div>
      <button
        ref={firstOptionBtnRef}
        onClick={(e) => handleClick(e, options[0])}
        className={`h-[30px] mx-[5px] rounded-[10px] px-[15px] text-sm relative transition-colors duration-200 ${
          options[0].id === option?.id ? "text-white" : ""
        }`}
      >
        {options[0].name}
      </button>
      {options.slice(1).map((item) => (
        <button
          key={item.id}
          onClick={(e) => handleClick(e, item)}
          className={`h-[30px] mx-[5px] rounded-[10px] px-[15px] text-sm relative transition-colors duration-200 ${
            item.id === option?.id ? "text-white" : ""
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default SortOptions;
