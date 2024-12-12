import { useEffect, useState } from "react";
import authConfigStore from "../../zstore/authConfigStore";
import { Main } from "../layouts";
import { motion } from "framer-motion";

const items = [
  { id: 1, content: "Slide 1" },
  { id: 2, content: "Slide 2" },
  { id: 3, content: "Slide 3" },
  { id: 4, content: "Slide 4" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="h-[460px] rounded-xl overflow-hidden relative m-auto">
      <motion.div
        className="flex h-full"
        style={{
          transition: "transform 0.5s ease",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item) => (
          <motion.div key={item.id} className="min-w-full">
            <h2>{item.content}</h2>
          </motion.div>
        ))}
      </motion.div>

      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={prevSlide}
      >
        Prev
      </button>

      <button
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

const Home = () => {
  const user = authConfigStore((state) => state.user);

  useEffect(() => {
    document.title = "ARythm";
  }, []);

  return (
    <Main>
      <div className="p-[30px]">
        <Carousel />
      </div>
    </Main>
  );
};

export default Home;
