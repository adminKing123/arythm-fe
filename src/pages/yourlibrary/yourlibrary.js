import authConfigStore from "../../zstore/authConfigStore";
import ROUTES from "../../router/routes";
import { LibraryLatestHistorySongs } from "../../components/carousals/libraryHistorSongsCarousal";
import { useEffect } from "react";

const YourLibrary = () => {
  const user = authConfigStore((state) => state.user);

  useEffect(() => {
    document.title = "Your Library";
  }, []);

  if (!user) {
    alert("Please Login To Access This Page!");
    window.location = ROUTES.LOGIN;
    return;
  }

  return (
    <>
      <section className="p-[30px]">
        <LibraryLatestHistorySongs />
      </section>
    </>
  );
};

export default YourLibrary;
