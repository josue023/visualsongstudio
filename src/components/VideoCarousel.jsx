import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const videosMusica = [
  "https://www.youtube.com/embed/fDi2Q3ttKnc?si=cb6oTmtgjLCQmIVc",
  "https://www.youtube.com/embed/6rP1PVeKPQk?si=GudkMzDFd4dz9afW",
  "https://www.youtube.com/embed/xVjZr_-v66A?si=4NwLtLerzjTcEQLv",
];

const videosCine = [
  "https://www.youtube.com/embed/toTVbd-2psg?si=bp0w_3Zp0-dzCeYj",
  "https://www.youtube.com/embed/jJ4jH7uboAY?si=lNaSK5EaVpja8SCT",
];

export default function VideoCarousel({ name }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 izquierda, 1 derecha

  const videos = name === "videos" ? videosMusica : videosCine;

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % videos.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-6">
      {/* Flechas */}
      <button
        onClick={prev}
        aria-label="Video anterior"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white hover:scale-110 transition cursor-pointer"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        aria-label="Video siguiente"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white hover:scale-110 transition cursor-pointer"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Carrusel */}
      <div className="mx-auto w-full max-w-[560px] aspect-video overflow-hidden relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <iframe
              src={videos[index]}
              title={`video-${index}`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
