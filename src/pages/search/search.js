import { useEffect, useRef, useState } from "react";
import { SearchSvg } from "../../assets/svg";

const SortOptions = () => {
  const sliderRef = useRef(null);
  const firstOptionBtnRef = useRef(null);

  const options = [
    {
      id: 1,
      name: "Featured",
    },
    {
      id: 2,
      name: "Popular",
    },
    {
      id: 3,
      name: "Newest",
    },
  ];

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

const SearchInput = () => {
  return (
    <div className="relative w-full">
      <input
        className="h-10 w-full bg-[#222227] rounded-xl pl-5 pr-20 focus:outline-none text-white placeholder:text-[#c0c0c0]"
        placeholder="Search..."
      ></input>
      <div className="absolute top-0 right-0 h-full flex items-center mr-5">
        <SearchSvg className="fill-white w-5 h-5" />
      </div>
    </div>
  );
};

const Search = () => {
  document.title = "Search";

  return (
    <>
      <section className="p-[30px]">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-white text-[30px]">Search</h2>
        </div>
      </section>
      <section className="p-[30px] border-t border-b border-[#2a2a2a]">
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center">
            <div className="w-[220px]">
              <SearchInput />
            </div>
            <button className="ml-[10px] text-sm py-2 px-3 border rounded-lg bg-gradient-to-r from-[#2a2a2a] to-[#333333] text-[#ddd] hover:from-[#333333] hover:to-[#444444] hover:text-[#fff] border-[#555] hover:border-[#666] shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">
              Filters
            </button>
          </div>
          <SortOptions />
        </div>
      </section>
    </>
  );
};

export default Search;
