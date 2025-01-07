import { useEffect, useRef } from "react";

const SortOptions = ({ defaultIndex, options, value, setValue, onChange }) => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = (e, item) => {
    const selectedButton = e.target;
    sliderRef.current.style.transform = `translateX(${selectedButton.offsetLeft}px)`;
    sliderRef.current.style.width = `${selectedButton.offsetWidth}px`;
    setValue(item);
    onChange?.(item);
  };

  useEffect(() => {
    if (sliderRef.current === null || containerRef.current === null) return;
    const container = containerRef.current;
    const defaultActiveElement =
      container.getElementsByClassName("sort-button")[defaultIndex];
    if (defaultActiveElement) {
      sliderRef.current.style.transform = `translateX(${defaultActiveElement.offsetLeft}px)`;
      sliderRef.current.style.width = `${defaultActiveElement.offsetWidth}px`;
    }
  }, [sliderRef, containerRef, defaultIndex]);

  return (
    <div
      ref={containerRef}
      className="h-10 bg-[#222227] flex items-center rounded-xl relative"
    >
      <div
        ref={sliderRef}
        className="h-[30px] absolute top-[5px] bg-[#25a56a] rounded-[10px] transition-all duration-200"
      ></div>
      {options.map((item) => (
        <button
          key={item.id}
          onClick={(e) => handleClick(e, item)}
          className={`sort-button h-[30px] mx-[5px] rounded-[10px] px-[15px] text-sm relative transition-colors duration-200 ${
            item.id === value?.id ? "text-white" : ""
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default SortOptions;
