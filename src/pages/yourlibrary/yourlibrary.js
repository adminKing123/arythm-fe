import authConfigStore from "../../zstore/authConfigStore";
import ROUTES from "../../router/routes";
import { LibraryLatestHistorySongs } from "../../components/carousals/libraryHistorSongsCarousal";
import { LibraryPlaylists } from "../../components/songcards/containers";
import { scrollTo } from "../../api/utils";

const YourLibrary = () => {
  document.title = "Your Library";
  scrollTo("main-content", { top: 0, behavior: "instant" });
  const user = authConfigStore((state) => state.user);

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
      <section className="p-[30px]">
        <LibraryPlaylists />
      </section>
    </>
  );
};

export default YourLibrary;
