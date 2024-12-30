import { useEffect, useState } from "react";
import { SearchInput } from "../../components/Inputs/inputs";
import DropDown from "../../components/selectors/dropdown";
import SortOptions from "../../components/selectors/sortoptions";
import { useSearchParams } from "react-router-dom";
import pageItemsStore from "../../zstore/pageItemsStore";
import { useFilteredSongs } from "../../api/songs/queryHooks";
import { useDebounce } from "use-debounce";
import {
  SongCard2,
  SongCard2Loading,
} from "../../components/songcards/songcard";
import { getParamFromUrl } from "../../api/utils";

const FilterSongsContainer = ({ songs }) => {
  return (
    <div className="grid gap-[15px] mt-8 grid-cols-1 md:grid-cols-2">
      {songs.map((song) => (
        <SongCard2 key={song.id} song={song} />
      ))}
    </div>
  );
};

const SearchFilter = () => {
  const dropdownOptions = [
    { id: 1, name: "All Songs", index: 0 },
    { id: 2, name: "Legacy Artists", index: 1 },
    { id: 3, name: "Albums", index: 2 },
    { id: 4, name: "Genres", index: 3 },
    { id: 5, name: "Release Year", index: 4 },
  ];
  const sortOptions = [
    { id: 1, name: "Featured" },
    { id: 2, name: "Popular" },
    { id: 3, name: "Newest" },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialIndex = parseInt(searchParams.get("index")) || 0;
  const initialOffset = parseInt(searchParams.get("offset")) || 0;

  const limit = 24;

  const [filters, setFilters] = useState({
    q: initialQuery,
    searchBy: dropdownOptions[initialIndex],
    sortBy: sortOptions[0],
    offset: initialOffset,
  });

  const [debouncedFilters] = useDebounce(filters, 300);

  const { data, isLoading, isFetching, isError } = useFilteredSongs(
    debouncedFilters.q,
    debouncedFilters.searchBy.id,
    debouncedFilters.sortBy.id,
    limit,
    debouncedFilters.offset
  );

  const setShowGlobalSearch = pageItemsStore(
    (state) => state.setShowGlobalSearch
  );

  const handlePageChange = (url) => {
    const newOffset = parseInt(getParamFromUrl(url, "offset")) || 0;
    setFilters((prev) => ({ ...prev, offset: newOffset }));
    setSearchParams({
      q: filters.q,
      index: filters.searchBy.index,
      offset: newOffset,
    });
    const element = document.getElementById("main-content");
    element.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setShowGlobalSearch(false);
    return () => setShowGlobalSearch(true);
  }, [setShowGlobalSearch]);

  return (
    <>
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <div className="flex items-center flex-wrap gap-[30px]">
          <div className="w-[220px]">
            <SearchInput
              value={filters.q}
              onChange={(e) => {
                setFilters({ ...filters, q: e.target.value, offset: 0 });
                setSearchParams({
                  q: e.target.value,
                  index: filters.searchBy.index,
                  offset: 0,
                });
              }}
            />
          </div>
          <div>
            <DropDown
              value={filters.searchBy}
              setValue={(selected) =>
                setFilters({ ...filters, searchBy: selected, offset: 0 })
              }
              options={dropdownOptions}
              onChange={(selected) => {
                setFilters({ ...filters, searchBy: selected, offset: 0 });
                setSearchParams({
                  q: filters.q,
                  index: selected.index,
                  offset: 0,
                });
              }}
            />
          </div>
        </div>
        <SortOptions
          value={filters.sortBy}
          setValue={(selected) =>
            setFilters({ ...filters, sortBy: selected, offset: 0 })
          }
          options={sortOptions}
          onChange={(selected) => {
            setFilters({ ...filters, sortBy: selected, offset: 0 });
            setSearchParams({
              q: filters.q,
              index: filters.searchBy.index,
              offset: 0,
            });
          }}
        />
      </div>
      {isLoading || isFetching ? (
        <div className="grid gap-[15px] mt-8 grid-cols-1 md:grid-cols-2">
          {Array.from({ length: 24 }, (_, index) => (
            <SongCard2Loading key={index} />
          ))}
        </div>
      ) : isError || data.results.length === 0 ? (
        <div className="py-8 text-center text-xl">No result Found</div>
      ) : (
        <FilterSongsContainer songs={data.results} />
      )}
      {!isError &&
      !isLoading &&
      !isFetching &&
      (data?.next || data?.previous) ? (
        <div className="flex justify-center items-center gap-5 mt-8">
          <button
            className="px-3 py-1 rounded-lg hover:bg-[#1e1e1e] disabled:opacity-50"
            disabled={data.previous === null}
            onClick={() => handlePageChange(data.previous)}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 rounded-lg hover:bg-[#1e1e1e] disabled:opacity-50"
            disabled={data.next === null}
            onClick={() => handlePageChange(data.next)}
          >
            Next
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
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

// const SearchFilter = () => {
//   const dropdownOptions = [
//     { id: 1, name: "All Songs", index: 0 },
//     { id: 2, name: "Legacy Artists", index: 1 },
//     { id: 3, name: "Albums", index: 2 },
//     { id: 4, name: "Genres", index: 3 },
//     { id: 5, name: "Release Year", index: 4 },
//   ];
//   const sortOptions = [
//     {
//       id: 1,
//       name: "Featured",
//     },
//     {
//       id: 2,
//       name: "Popular",
//     },
//     {
//       id: 3,
//       name: "Newest",
//     },
//   ];
//   const [searchParams, setSearchParams] = useSearchParams();
//   const q = searchParams.get("q") || "";
//   const index = parseInt(searchParams.get("index")) || 0;
//   const limit = 24;
//   const offsetP = parseInt(searchParams.get("offset")) || 0;

//   const [value, setValue] = useState(q);
//   const [searchBy, setSearchBy] = useState(dropdownOptions[index]);
//   const [sortBy, setSortBy] = useState(sortOptions[0]);
//   const [offset, setOffset] = useState(offsetP);

//   const setShowGlobalSearch = pageItemsStore(
//     (state) => state.setShowGlobalSearch
//   );

//   const [debouncedQ] = useDebounce(value, 300);

//   const { data, isLoading, isFetching, isError } = useFilteredSongs(
//     debouncedQ,
//     searchBy.id,
//     sortBy.id,
//     limit,
//     offset
//   );

//   const handlePageChange = (url) => {
//     const gotoffset = parseInt(getParamFromUrl(url, "offset")) || 0;
//     setOffset(gotoffset);
//     setSearchParams({ q: value, index: searchBy.index, offset: gotoffset });
//     const element = document.getElementById("main-content");
//     element.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   useEffect(() => {
//     setShowGlobalSearch(false);
//     return () => setShowGlobalSearch(true);
//   }, [setShowGlobalSearch]);

//   return (
//     <>
//       <div className="flex items-center justify-between gap-5 flex-wrap">
//         <div className="flex items-center flex-wrap gap-[30px]">
//           <div className="w-[220px]">
//             <SearchInput
//               value={value}
//               onChange={(e) => {
//                 setOffset(0);
//                 setValue(e.target.value);
//                 setSearchParams({
//                   q: e.target.value,
//                   index: searchBy.index,
//                   offset: 0,
//                 });
//               }}
//             />
//           </div>
//           <div>
//             <DropDown
//               value={searchBy}
//               setValue={setSearchBy}
//               options={dropdownOptions}
//               onChange={(selected) => {
//                 setOffset(0);
//                 setSearchParams({
//                   q: value,
//                   index: selected.index,
//                   offset: 0,
//                 });
//               }}
//             />
//           </div>
//         </div>
//         <SortOptions
//           value={sortBy}
//           setValue={setSortBy}
//           options={sortOptions}
//           onChange={() => {
//             setOffset(0);
//             setSearchParams({
//               q: value,
//               index: searchBy.index,
//               offset: 0,
//             });
//           }}
//         />
//       </div>
//       {isLoading || isFetching ? (
//         <div className="grid gap-[15px] mt-8 grid-cols-1 md:grid-cols-2">
//           {Array.from({ length: 24 }, (_, index) => (
//             <SongCard2Loading key={index} />
//           ))}
//         </div>
//       ) : isError || data.results.length === 0 ? (
//         <div className="py-8 text-center text-xl">No result Found</div>
//       ) : (
//         <FilterSongsContainer songs={data.results} />
//       )}
//       {!isError &&
//       !isLoading &&
//       !isFetching &&
//       (data?.next || data?.previous) ? (
//         <div className="flex justify-center items-center gap-5 mt-8">
//           <button
//             className="px-3 py-1 rounded-lg hover:bg-[#1e1e1e] disabled:opacity-50"
//             disabled={data.previous === null}
//             onClick={() => handlePageChange(data.previous)}
//           >
//             Prev
//           </button>
//           <button
//             className="px-3 py-1 rounded-lg hover:bg-[#1e1e1e] disabled:opacity-50"
//             disabled={data.next === null}
//             onClick={() => handlePageChange(data.next)}
//           >
//             Next
//           </button>
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };
