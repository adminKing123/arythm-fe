import { SearchInput } from "../../components/Inputs/inputs";
import SortOptions from "../../components/selectors/sortoptions";

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
          <SortOptions
            options={[
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
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default Search;
