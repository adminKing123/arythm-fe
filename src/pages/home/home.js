import { useEffect } from "react";
import { Main } from "../layouts";
import { NextLink } from "../../components/links/links";
import "swiper/css";
import HeroCarousel from "../../components/carousals/herocarousal";
import {
  useGetSlides,
  useGetSongsLatestRelease,
} from "../../api/songs/queryHooks";
import SongCard, { SongCardLoading } from "../../components/songcards/songcard";

const OwlCarousel = () => {
  const { isLoading, isError, data } = useGetSlides();

  if (isLoading || isError)
    return (
      <div className="skeleton h-[360px] sm:h-[360px] md:h-[460px] w-full rounded-xl"></div>
    );
  return <HeroCarousel slides={data} />;
};

const NewRelesese = () => {
  const { isLoading, isError, data } = useGetSongsLatestRelease();

  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">New Releases</h2>
        <NextLink className="text-[16px]">See All</NextLink>
      </div>
      {isLoading || isError ? (
        <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {Array.from({ length: 12 }, (_, index) => (
            <SongCardLoading key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {data.results.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </>
  );
};

const Home = () => {
  useEffect(() => {
    document.title = "ARhythm";
  }, []);

  return (
    <Main>
      <section className="p-[30px]">
        <OwlCarousel />
      </section>
      <section className="p-[30px]">
        <NewRelesese />
      </section>
    </Main>
  );
};

export default Home;
