import { SearchInput } from "../../components/Inputs/inputs";
import DropDown from "../../components/selectors/drapdown";
import SortOptions from "../../components/selectors/sortoptions";

const SearchFilter = () => {
  const dropdownOptions = [
    { id: 1, name: "All Songs" },
    { id: 2, name: "Legacy Artists" },
    { id: 3, name: "Albums" },
    { id: 4, name: "Genres" },
    { id: 5, name: "Release Year" },
  ];
  const sortOptions = [
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

  return (
    <div className="flex items-center justify-between gap-5 flex-wrap">
      <div className="flex items-center flex-wrap gap-[30px]">
        <div className="w-[220px]">
          <SearchInput />
        </div>
        <div>
          <DropDown
            options={dropdownOptions}
            defaultValue={dropdownOptions[0]}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </div>
      </div>
      <SortOptions options={sortOptions} />
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
        <SearchFilter />
      </section>
    </>
  );
};

export default Search;
