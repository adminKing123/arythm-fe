import { useEffect } from "react";
import { Main } from "../layouts";

const OwlCarousel = () => {
  return (
    <div className="h-[460px] rounded-xl border">
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    document.title = "ARythm";
  }, []);

  return (
    <Main>
      <div className="p-[30px]">
        <OwlCarousel />
      </div>
    </Main>
  );
};

export default Home;
