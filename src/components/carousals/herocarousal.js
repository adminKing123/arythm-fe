import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import Button from "../../components/buttons/buttons";
import { NextSvg, PrevSvg } from "../../assets/svg";
import { useGetSlides } from "../../api/songs/queryHooks";

const OwlCarouselCard = ({ slide }) => {
  return (
    <div
      className="md:pr-[10%] lg:pr[25%] xl:pr-[50%] p-[30px] md:p-[60px] flex flex-col justify-center items-start w-full h-full relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-br before:from-black/70 before:to-black/0"
      style={{
        background: `url("${slide.img}") center center / cover no-repeat`,
      }}
    >
      <h2 className="text-white relative text-[22px] md:text-[44px] md:leading-[130%]">
        {slide.title}
      </h2>
      <p className="relative mt-[15px] md:leading-7 text-[12px] md:text-[17px]">
        {slide.description}
      </p>
      <div className="relative flex items-center gap-[30px] mt-[40px] flex-wrap">
        {slide.btns?.[0] && (
          <Button className="w-[160px]">{slide.btns[0]}</Button>
        )}
        {slide.btns?.[1] && (
          <Button varient="secondary" className="w-[160px]">
            {slide.btns[1]}
          </Button>
        )}
      </div>
    </div>
  );
};

const Dots = ({ swiperRef, slideLength }) => {
  const [index, setIndex] = useState(0);

  const changeSlide = (index) => {
    swiperRef.current?.slideToLoop(index);
  };

  useEffect(() => {
    const swiperEle = swiperRef.current;

    const handleChange = () => {
      setIndex(swiperEle.realIndex);
    };

    if (swiperEle) swiperEle.on("slideChange", handleChange);

    return () => {
      if (swiperEle) swiperEle.off("slideChange", handleChange);
    };
  }, [swiperRef]);

  return (
    <>
      {Array.from({ length: slideLength }).map((_, dotIndex) => (
        <span
          key={dotIndex}
          className={`${dotIndex} cursor-pointer h-[4px] inline-block rounded-sm transition-all duration-300 ${
            dotIndex === index ? "w-5 bg-white" : "w-[10px] bg-[#c0c0c0]"
          } ${dotIndex === slideLength - 1 ? "" : "mr-[10px]"}`}
          onClick={() => changeSlide(dotIndex)}
        ></span>
      ))}
    </>
  );
};

const HeroCarousel = () => {
  const swiperRef = useRef(null);

  const handleNext = () => swiperRef.current && swiperRef.current.slideNext();
  const handlePrev = () => swiperRef.current && swiperRef.current.slidePrev();

  const { isLoading, isError, data: slides } = useGetSlides();

  if (isLoading || isError)
    return (
      <div className="skeleton h-[360px] sm:h-[360px] md:h-[460px] w-full rounded-xl"></div>
    );

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        onSwiper={(swiperInstance) => {
          swiperRef.current = swiperInstance;
        }}
        className="h-fit sm:h-[360px] md:h-[460px] w-full rounded-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <OwlCarouselCard slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="z-[1] flex items-center justify-center mt-[20px] 2lg:absolute 2lg:bottom-[12px] 2lg:right-0 2lg:pr-[60px]">
        <Dots swiperRef={swiperRef} slideLength={slides.length} />
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

export default HeroCarousel;
