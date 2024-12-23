import {
  HeroArtists,
  NewRelesese,
} from "../../components/songcards/containers";
import { HeroCarousel } from "../../components/carousals";

const Home = () => {
  document.title = "ARhythm";

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
