import {
  HeroArtists,
  NewRelesese,
} from "../../components/songcards/containers";
import { HeroCarousel } from "../../components/carousals";
import { scrollTo } from "../../api/utils";

const Home = () => {
  document.title = "ARhythm";
  scrollTo("main-content", { top: 0, behavior: "instant" });

  return (
    <>
      <section className="p-[30px]">
        <HeroCarousel />
      </section>
      <section className="p-[30px]">
        <NewRelesese />
      </section>
      <section className="p-[30px]">
        <HeroArtists />
      </section>
    </>
  );
};

export default Home;
