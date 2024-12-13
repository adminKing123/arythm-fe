import { useEffect, useRef, useState } from "react";
import { Main } from "../layouts";
import { ALink, ArtistsLinks, NextLink } from "../../components/links/links";
import { get_src_uri } from "../../api/utils";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
import Button from "../../components/buttons/buttons";
import { NextSvg, PrevSvg } from "../../assets/svg";

const songs = [
  {
    id: 1092,
    title: "ARMBH - Arambha (NF's Mix).mp3",
    url: "songs-file/ARMBH%20-%20Arambha%20%28NF%27s%20Mix%29.mp3",
    original_name: "Arambha (NF's Mix)",
    lyrics: "lrc/1092.lrc",
    album: {
      id: 728,
      code: "ARMBH",
      title: "Aarambh (NF's Hope Mix)",
      year: 2023,
      thumbnail300x300:
        "album-images/300x300/ARMBH%20-%20Aarambh%20%28NF%27s%20Hope%20Mix%29%20%282023%29.png",
      thumbnail1200x1200:
        "album-images/1200x1200/ARMBH%20-%20Aarambh%20%28NF%27s%20Hope%20Mix%29%20%282023%29.png",
    },
    tags: [
      {
        id: 2,
        name: "Hindi",
      },
      {
        id: 6,
        name: "English",
      },
    ],
    artists: [
      {
        id: 584,
        name: "Piyush Mishra",
        thumbnail300x300: "artist-images/300x300/Piyush%20Mishra.png",
        thumbnail1200x1200: "artist-images/1200x1200/Piyush%20Mishra.png",
      },
      {
        id: 585,
        name: "NF (rapper)",
        thumbnail300x300: "artist-images/300x300/NF%20%28rapper%29.png",
        thumbnail1200x1200: "artist-images/1200x1200/NF%20%28rapper%29.png",
      },
    ],
  },
  {
    id: 1091,
    title: "MSFR - Get Low.mp3",
    url: "songs-file/MSFR%20-%20Get%20Low.mp3",
    original_name: "Get Low",
    lyrics: "lrc/1091.lrc",
    album: {
      id: 727,
      code: "MSFR",
      title: "Money Sucks, Friends Rule",
      year: 2014,
      thumbnail300x300:
        "album-images/300x300/MSFR%20-%20Money%20Sucks%2C%20Friends%20Rule%20%282014%29.png",
      thumbnail1200x1200:
        "album-images/1200x1200/MSFR%20-%20Money%20Sucks%2C%20Friends%20Rule%20%282014%29.png",
    },
    tags: [
      {
        id: 3,
        name: "BGM",
      },
      {
        id: 6,
        name: "English",
      },
    ],
    artists: [
      {
        id: 582,
        name: "DJ Snake",
        thumbnail300x300: "artist-images/300x300/DJ%20Snake.png",
        thumbnail1200x1200: "artist-images/1200x1200/DJ%20Snake.png",
      },
      {
        id: 583,
        name: "Dillon Francis",
        thumbnail300x300: "artist-images/300x300/Dillon%20Francis.png",
        thumbnail1200x1200: "artist-images/1200x1200/Dillon%20Francis.png",
      },
    ],
  },
  {
    id: 1090,
    title: "WHPT - Whoopty.mp3",
    url: "songs-file/WHPT%20-%20Whoopty.mp3",
    original_name: "Whoopty",
    lyrics: "lrc/1090.lrc",
    album: {
      id: 726,
      code: "WHPT",
      title: "Whoopty",
      year: 2021,
      thumbnail300x300:
        "album-images/300x300/WHPT%20-%20Whoopty%20%282021%29.png",
      thumbnail1200x1200:
        "album-images/1200x1200/WHPT%20-%20Whoopty%20%282021%29.png",
    },
    tags: [
      {
        id: 3,
        name: "BGM",
      },
      {
        id: 6,
        name: "English",
      },
    ],
    artists: [
      {
        id: 581,
        name: "Robert Cristian",
        thumbnail300x300: "artist-images/300x300/Robert%20Cristian.png",
        thumbnail1200x1200: "artist-images/1200x1200/Robert%20Cristian.png",
      },
    ],
  },
  {
    id: 1089,
    title: "RR - Saree Ke Fall Sa.mp3",
    url: "songs-file/RR%20-%20Saree%20Ke%20Fall%20Sa.mp3",
    original_name: "Saree Ke Fall Sa",
    lyrics: "lrc/1089.lrc",
    album: {
      id: 297,
      code: "RR",
      title: "R... Rajkumar",
      year: 2013,
      thumbnail300x300:
        "album-images/300x300/RR%20-%20R...%20Rajkumar%20(2013).jpg",
      thumbnail1200x1200:
        "album-images/1200x1200/RR%20-%20R...%20Rajkumar%20(2013).jpg",
    },
    tags: [
      {
        id: 2,
        name: "Hindi",
      },
    ],
    artists: [
      {
        id: 67,
        name: "Antara Mitra",
        thumbnail300x300: "artist-images/300x300/Antara%20Mitra.jpg",
        thumbnail1200x1200: "artist-images/1200x1200/Antara%20Mitra.jpg",
      },
      {
        id: 38,
        name: "Nakash Aziz",
        thumbnail300x300: "artist-images/300x300/Nakash%20Aziz.jpg",
        thumbnail1200x1200: "artist-images/1200x1200/Nakash%20Aziz.jpg",
      },
    ],
  },
  {
    id: 1088,
    title: "RR - Gandi Baat.mp3",
    url: "songs-file/RR%20-%20Gandi%20Baat.mp3",
    original_name: "Gandi Baat",
    lyrics: "lrc/1088.lrc",
    album: {
      id: 297,
      code: "RR",
      title: "R... Rajkumar",
      year: 2013,
      thumbnail300x300:
        "album-images/300x300/RR%20-%20R...%20Rajkumar%20(2013).jpg",
      thumbnail1200x1200:
        "album-images/1200x1200/RR%20-%20R...%20Rajkumar%20(2013).jpg",
    },
    tags: [
      {
        id: 2,
        name: "Hindi",
      },
    ],
    artists: [
      {
        id: 37,
        name: "Mika Singh",
        thumbnail300x300: "artist-images/300x300/Mika%20Singh.jpg",
        thumbnail1200x1200: "artist-images/1200x1200/Mika%20Singh.jpg",
      },
      {
        id: 35,
        name: "Pritam Chakraborty",
        thumbnail300x300: "artist-images/300x300/Pritam%20Chakraborty.jpg",
        thumbnail1200x1200: "artist-images/1200x1200/Pritam%20Chakraborty.jpg",
      },
      {
        id: 339,
        name: "Kalpana Patowary",
        thumbnail300x300: "artist-images/300x300/Kalpana%20Patowary.jpg",
        thumbnail1200x1200: "artist-images/1200x1200/Kalpana%20Patowary.jpg",
      },
    ],
  },
  {
    id: 1087,
    title: "ElCmzo - Gata Only.mp3",
    url: "songs-file/ElCmzo%20-%20Gata%20Only.mp3",
    original_name: "Gata Only",
    lyrics: "lrc/1087.lrc",
    album: {
      id: 725,
      code: "ElCmzo",
      title: "El Comienzo",
      year: 2024,
      thumbnail300x300: "album-images/300x300/El%20Comienzo.png",
      thumbnail1200x1200: "album-images/1200x1200/El%20Comienzo.png",
    },
    tags: [
      {
        id: 1,
        name: "Spanish",
      },
    ],
    artists: [
      {
        id: 579,
        name: "Cris MJ",
        thumbnail300x300: "artist-images/300x300/Cris%20MJ.png",
        thumbnail1200x1200: "artist-images/1200x1200/Cris%20MJ.png",
      },
      {
        id: 580,
        name: "FloyyMenor",
        thumbnail300x300: "artist-images/300x300/FloyyMenor.png",
        thumbnail1200x1200: "artist-images/1200x1200/FloyyMenor.png",
      },
    ],
  },
  {
    id: 1086,
    title: "AiSHA - Gal Mitthi Mitthi Bol.mp3",
    url: "songs-file/AiSHA%20-%20Gal%20Mitthi%20Mitthi%20Bol.mp3",
    original_name: "Gal Mitthi Mitthi Bol",
    lyrics: "lrc/1086.lrc",
    album: {
      id: 488,
      code: "AiSHA",
      title: "Aisha",
      year: 2010,
      thumbnail300x300: "album-images/300x300/AiSHA%20-%20Aisha%20(2010).jpg",
      thumbnail1200x1200:
        "album-images/1200x1200/AiSHA%20-%20Aisha%20(2010).jpg",
    },
    tags: [
      {
        id: 2,
        name: "Hindi",
      },
    ],
    artists: [
      {
        id: 150,
        name: "Amit Trivedi",
        thumbnail300x300: "artist-images/300x300/Amit%20Trivedi.jpg",
        thumbnail1200x1200: "artist-images/1200x1200/Amit%20Trivedi.jpg",
      },
      {
        id: 308,
        name: "Tochi Raina",
        thumbnail300x300: "artist-images/300x300/Tochi%20Raina.jpg",
        thumbnail1200x1200: "artist-images/1200x1200/Tochi%20Raina.jpg",
      },
    ],
  },
  {
    id: 1085,
    title: "TtM - Le Monde.mp3",
    url: "songs-file/TtM%20-%20Le%20Monde.mp3",
    original_name: "Le Monde",
    lyrics: "lrc/1085.lrc",
    album: {
      id: 724,
      code: "TtM",
      title: "Talk to Me",
      year: 2023,
      thumbnail300x300: "album-images/300x300/Talk%20to%20Me.png",
      thumbnail1200x1200: "album-images/1200x1200/Talk%20to%20Me.png",
    },
    tags: [
      {
        id: 3,
        name: "BGM",
      },
      {
        id: 4,
        name: "French",
      },
    ],
    artists: [
      {
        id: 578,
        name: "Richard Carter",
        thumbnail300x300: "artist-images/300x300/Richard%20Carter.png",
        thumbnail1200x1200: "artist-images/1200x1200/Richard%20Carter.png",
      },
    ],
  },
  {
    id: 1084,
    title: "FITR - Fitoor.mp3",
    url: "songs-file/FITR%20-%20Fitoor.mp3",
    original_name: "Fitoor",
    lyrics: "lrc/1084.lrc",
    album: {
      id: 723,
      code: "FITR",
      title: "Fitoor",
      year: 2016,
      thumbnail300x300: "album-images/300x300/Fitoor.png",
      thumbnail1200x1200: "album-images/1200x1200/Fitoor.png",
    },
    tags: [
      {
        id: 2,
        name: "Hindi",
      },
    ],
    artists: [
      {
        id: 1,
        name: "Arijit Singh",
        thumbnail300x300: "artist-images/300x300/Arijit%20Singh.jpg",
        thumbnail1200x1200: "artist-images/1200x1200/Arijit%20Singh.jpg",
      },
    ],
  },
  {
    id: 1083,
    title: "DžNM - Džanum.mp3",
    url: "songs-file/DžNM - Džanum.mp3",
    original_name: "Džanum",
    lyrics: "lrc/1083.lrc",
    album: {
      id: 722,
      code: "DžNM",
      title: "Džanum",
      year: 2023,
      thumbnail300x300: "album-images/300x300/Džanum.png",
      thumbnail1200x1200: "album-images/1200x1200/Džanum.png",
    },
    tags: [
      {
        id: 5,
        name: "Serbian",
      },
    ],
    artists: [
      {
        id: 577,
        name: "Teya Dora",
        thumbnail300x300: "artist-images/300x300/Teya%20Dora.png",
        thumbnail1200x1200: "artist-images/1200x1200/Teya%20Dora.png",
      },
    ],
  },
  {
    id: 1082,
    title: "✻HR - ✻H+3+ЯД✻7luCJIo0T6....mp3",
    url: "songs-file/%E2%9C%BBHR%20-%20%E2%9C%BBH%2B3%2B%D0%AF%D0%94%E2%9C%BB7luCJIo0T6....mp3",
    original_name: "✻H+3+ЯД✻7luCJIo0T6...",
    lyrics: "lrc/1082.lrc",
    album: {
      id: 721,
      code: "✻HR",
      title: "✻H+3+ЯД✻7luCJIo0T6... (Remixes)",
      year: 2024,
      thumbnail300x300:
        "album-images/300x300/✻H+3+ЯД✻7luCJIo0T6... (Remixes).png",
      thumbnail1200x1200:
        "album-images/1200x1200/✻H+3+ЯД✻7luCJIo0T6... (Remixes).png",
    },
    tags: [
      {
        id: 3,
        name: "BGM",
      },
      {
        id: 6,
        name: "English",
      },
    ],
    artists: [
      {
        id: 576,
        name: "vyrval",
        thumbnail300x300: "artist-images/300x300/vyrval.png",
        thumbnail1200x1200: "artist-images/1200x1200/vyrval.png",
      },
    ],
  },
  {
    id: 1081,
    title: "BTW - Bloody Mary (BGM).mp3",
    url: "songs-file/BTW%20-%20Bloody%20Mary%20(BGM).mp3",
    original_name: "Bloody Mary (BGM)",
    lyrics: "lrc/1081.lrc",
    album: {
      id: 720,
      code: "BTW",
      title: "Born This Way",
      year: 2011,
      thumbnail300x300: "album-images/300x300/Born%20This%20Way.png",
      thumbnail1200x1200: "album-images/1200x1200/Born%20This%20Way.png",
    },
    tags: [
      {
        id: 3,
        name: "BGM",
      },
      {
        id: 6,
        name: "English",
      },
    ],
    artists: [
      {
        id: 575,
        name: "Lady Gaga",
        thumbnail300x300: "artist-images/300x300/Lady%20Gaga.png",
        thumbnail1200x1200: "artist-images/1200x1200/Lady%20Gaga.png",
      },
    ],
  },
];

const slides = [
  {
    id: 1,
    title: "Record Label & Music streaming",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
    img: "https://volna.volkovdesign.com/img/home/slide1.jpg",
    btns: ["BUY NOW", "LEARN MORE"],
  },
  {
    id: 2,
    title:
      "Metallica and Slipknot feature in trailer for ‘Long Live Rock’ documentary",
    description:
      "It also features Rage Against The Machine, Guns N' Roses and a number of others",
    img: "https://volna.volkovdesign.com/img/home/slide2.jpg",
    btns: ["LEARN MORE", "WATCH VIDEO"],
  },
  {
    id: 3,
    title: "New Artist of Our Label",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
    img: "https://volna.volkovdesign.com/img/home/slide3.jpg",
    btns: [null, "LEARN MORE"],
  },
];

const OwlCarouselCard = ({ slide }) => {
  return (
    <div
      className="md:pr-[10%] lg:pr[25%] xl:pr-[50%] p-[60px] flex flex-col justify-center items-start w-full h-full relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-br before:from-black/70 before:to-black/0"
      style={{
        background: `url("${slide.img}") center center / cover no-repeat`,
      }}
    >
      <h2 className="text-white relative text-[44px] leading-[130%]">
        {slide.title}
      </h2>
      <p className="relative mt-[15px] leading-7 text-[17px]">
        {slide.description}
      </p>
      <div className="relative mt-10">
        {slide.btns?.[0] && (
          <Button className="w-[160px] mr-[30px]">{slide.btns[0]}</Button>
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
          className={`${dotIndex} cursor-pointer h-[4px] inline-block mr-[10px] rounded-sm transition-all duration-300 ${
            dotIndex === index ? "w-5 bg-white" : "w-[10px] bg-[#c0c0c0]"
          }`}
          onClick={() => changeSlide(dotIndex)}
        ></span>
      ))}
    </>
  );
};

const OwlCarousel = () => {
  const swiperRef = useRef(null);

  const handleNext = () => swiperRef.current && swiperRef.current.slideNext();
  const handlePrev = () => swiperRef.current && swiperRef.current.slidePrev();

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
        className="h-[460px] w-full rounded-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <OwlCarouselCard slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-[12px] right-0 z-[1] pr-[60px] flex items-center">
        <Dots swiperRef={swiperRef} slideLength={slides.length} />
        <button onClick={handlePrev}>
          <PrevSvg className="fill-white hover:fill-[#25a56a] w-[30px] h-[30px] transition-colors duration-300" />
        </button>
        <button onClick={handleNext}>
          <NextSvg className="fill-white hover:fill-[#25a56a] w-[30px] h-[30px] transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

const SongCard = ({ song }) => {
  return (
    <div>
      <div>
        <img
          className="w-full aspect-square rounded-xl"
          alt={song.album.id}
          src={get_src_uri(song.album.thumbnail300x300)}
        />
      </div>
      <p className="mt-2 text-white truncate">
        <ALink>{song.original_name}</ALink>
      </p>
      <p className="text-sm truncate">
        <ArtistsLinks artists={song.artists} />
      </p>
    </div>
  );
};

const NewRelesese = () => {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-2xl">New Releases</h2>
        <NextLink>See All</NextLink>
      </div>
      <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
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
