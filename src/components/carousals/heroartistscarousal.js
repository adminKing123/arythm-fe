import { Swiper, SwiperSlide } from "swiper/react";
import ArtistCard, { ArtistCardLoading } from "../songcards/artistcard";
import { useEffect, useRef, useState } from "react";
import { NextSvg, PrevSvg } from "../../assets/svg";
import { useGetHeroArtists } from "../../api/songs/queryHooks";

const HeroArtistsSkeleton = () => {
  const [skeletonCount, setSkeletonCount] = useState(6);

  useEffect(() => {
    const updateSkeletonCount = () => {
      const width = window.innerWidth;

      if (width >= 1024) setSkeletonCount(6); // lg
      else if (width >= 768) setSkeletonCount(4); // md
      else if (width >= 640) setSkeletonCount(3); // sm
      else setSkeletonCount(2); // default
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);

    return () => window.removeEventListener("resize", updateSkeletonCount);
  }, []);

  return (
    <div className="grid gap-[30px] mt-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: skeletonCount }, (_, index) => (
        <ArtistCardLoading key={index} />
      ))}
    </div>
  );
};

const Dots = ({ swiperRef, slideLength }) => {
  const [index, setIndex] = useState(0);
  const [pageLength, setPageLength] = useState(0);

  const changeSlide = (index) => {
    const newIndex = Math.floor(
      (swiperRef.current.slides.length / pageLength) * index
    );
    swiperRef.current?.slideToLoop(newIndex);
  };

  useEffect(() => {
    const swiperEle = swiperRef.current;

    const handleChange = () => {
      const curr_index = swiperEle.realIndex;
      const per_page = Math.floor(slideLength / pageLength);
      setIndex(Math.floor(curr_index / per_page));
    };

    if (swiperEle) swiperEle.on("slideChange", handleChange);

    return () => {
      if (swiperEle) swiperEle.off("slideChange", handleChange);
    };
  }, [swiperRef, pageLength, slideLength]);

  useEffect(() => {
    const swiperEle = swiperRef.current;
    const updateSlidesPerView = () => {
      setPageLength(slideLength / swiperEle.params.slidesPerView);
    };

    updateSlidesPerView();

    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, [swiperRef, slideLength]);

  if (pageLength)
    return (
      <>
        {Array.from({ length: pageLength }).map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`${dotIndex} cursor-pointer h-[4px] inline-block rounded-sm transition-all duration-300 ${
              dotIndex === index ? "w-5 bg-white" : "w-[10px] bg-[#c0c0c0]"
            } ${dotIndex === pageLength - 1 ? "" : "mr-[10px]"}`}
            onClick={() => changeSlide(dotIndex)}
          ></span>
        ))}
      </>
    );
};

const HeroArtistsCarousal = () => {
  const swiperRef = useRef(null);

  const handleNext = () => swiperRef.current && swiperRef.current.slideNext();
  const handlePrev = () => swiperRef.current && swiperRef.current.slidePrev();

  const { isLoading, isError, data } = useGetHeroArtists();

  if (isLoading || isError) return <HeroArtistsSkeleton />;

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        onSwiper={(swiperInstance) => {
          swiperRef.current = swiperInstance;
        }}
      >
        {data.results.map((artist) => (
          <SwiperSlide key={artist.id}>
            <ArtistCard artist={artist} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-7 flex justify-end items-center m2lg:justify-center">
        <Dots swiperRef={swiperRef} slideLength={data.results.length} />
        <button
          onClick={handlePrev}
          className="hidden 2lg:inline-block ml-[10px]"
        >
          <PrevSvg className="fill-white hover:fill-[#25a56a] w-[30px] h-[30px] transition-colors duration-300" />
        </button>
        <button onClick={handleNext} className="hidden 2lg:inline-block">
          <NextSvg className="fill-white hover:fill-[#25a56a] w-[30px] h-[30px] transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

export default HeroArtistsCarousal;
