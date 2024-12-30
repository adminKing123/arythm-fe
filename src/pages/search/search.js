import { useEffect, useState } from "react";
import { SearchInput } from "../../components/Inputs/inputs";
import DropDown from "../../components/selectors/dropdown";
import SortOptions from "../../components/selectors/sortoptions";
import { useSearchParams } from "react-router-dom";
import pageItemsStore from "../../zstore/pageItemsStore";

const SearchFilter = () => {
  const dropdownOptions = [
    { id: 1, name: "All Songs", index: 0 },
    { id: 2, name: "Legacy Artists", index: 1 },
    { id: 3, name: "Albums", index: 2 },
    { id: 4, name: "Genres", index: 3 },
    { id: 5, name: "Release Year", index: 4 },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const index = parseInt(searchParams.get("index")) || 0;

  const [value, setValue] = useState(q);
  const [searchBy, setSearchBy] = useState(dropdownOptions[index]);
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const setShowGlobalSearch = pageItemsStore(
    (state) => state.setShowGlobalSearch
  );

  useEffect(() => {
    setShowGlobalSearch(false);
    return () => setShowGlobalSearch(true);
  }, []);

  return (
    <div className="flex items-center justify-between gap-5 flex-wrap">
      <div className="flex items-center flex-wrap gap-[30px]">
        <div className="w-[220px]">
          <SearchInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setSearchParams({ q: e.target.value, index: searchBy.index });
            }}
          />
        </div>
        <div>
          <DropDown
            value={searchBy}
            setValue={setSearchBy}
            options={dropdownOptions}
            onChange={(selected) => {
              setSearchParams({ q: value, index: selected.index });
            }}
          />
        </div>
      </div>
      <SortOptions value={sortBy} setValue={setSortBy} options={sortOptions} />
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
