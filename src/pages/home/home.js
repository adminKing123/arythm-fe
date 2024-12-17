import { useEffect } from "react";
import { Main } from "../layouts";
import { NewRelesese } from "../../components/songcards/containers";
import { HeroCarousel } from "../../components/carousals";

const Home = () => {
  useEffect(() => {
    document.title = "ARhythm";
  }, []);

  return (
    <Main>
      <section className="p-[30px]">
        <HeroCarousel />
      </section>
      <section className="p-[30px]">
        <NewRelesese />
      </section>
    </Main>
  );
};

export default Home;
