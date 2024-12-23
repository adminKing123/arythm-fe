import { useEffect } from "react";

const Search = () => {
  useEffect(() => {
    document.title = "Search";
  }, []);

  return (
    <>
      <section className="p-[30px]">
        <h2>Search</h2>
      </section>
    </>
  );
};

export default Search;
