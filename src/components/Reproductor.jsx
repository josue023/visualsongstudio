import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import "./Reproductor.css";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { audios } from "../data/audios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Reproductor({
  openAudio,
  setOpenAudio,
  audioActualId,
  setAudioActualId,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audio = audios.find((a) => a.id === audioActualId);

  // Maneja el cambio de audio
  useEffect(() => {
    const audioEl = audioRef.current;
    if (audio && audioEl) {
      setCurrentTime(0);
      setDuration(0);
      audioEl.currentTime = 0;
      audioEl.load();

      const handleLoaded = () => {
        setDuration(audioEl.duration || 0);
        audioEl.play();
        setIsPlaying(true);
      };

      audioEl.addEventListener("loadedmetadata", handleLoaded);

      return () => {
        audioEl.removeEventListener("loadedmetadata", handleLoaded);
      };
    }
  }, [audioActualId, audio]);

  // Escuchar eventos de tiempo
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const updateTime = () => setCurrentTime(audioEl.currentTime);
    audioEl.addEventListener("timeupdate", updateTime);

    return () => {
      audioEl.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlay = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (isPlaying) {
      audioEl.pause();
    } else {
      audioEl.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect(); // <-- usa currentTarget
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }

    setCurrentTime(time);
  };

  const handleClose = () => {
    const audioEl = audioRef.current;
    if (audioEl) audioEl.pause();
    setOpenAudio(false);
    setAudioActualId(0);
  };

  const siguiente = () => {
    const index = audios.findIndex((a) => a.id === audioActualId);
    if (index !== -1 && index < audios.length - 1) {
      setAudioActualId(audios[index + 1].id);
    }
  };

  const anterior = () => {
    const index = audios.findIndex((a) => a.id === audioActualId);
    if (index > 0) {
      setAudioActualId(audios[index - 1].id);
    }
  };

  const formatTime = (t) =>
    isNaN(t)
      ? "0:00"
      : `${Math.floor(t / 60)}:${("0" + Math.floor(t % 60)).slice(-2)}`;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl bg-animated-gradient2 text-white p-4 rounded-4xl shadow-xl shadow-[#000000]/20 backdrop-blur-sm"
      style={{ display: openAudio && audio ? "block" : "none" }}
    >
      <button
        className="absolute top-[-1px] right-[-3px] cursor-pointer"
        onClick={handleClose}
      >
        <IoIosCloseCircle
          size={24}
          className="text-white/80 hover:text-white transition hover:scale-110"
        />
      </button>

      <div className="flex flex-col items-center space-x-4">
        {/* Controles */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={anterior}
            className="flex items-center justify-center cursor-pointer text-white/80 hover:text-white transition"
          >
            <IoPlaySkipBack size={24} />
          </button>

          <button
            onClick={togglePlay}
            className="flex items-center justify-center cursor-pointer text-white hover:text-white/90 transition"
          >
            {isPlaying ? (
              <FaPauseCircle size={40} />
            ) : (
              <FaPlayCircle size={40} />
            )}
          </button>

          <button
            onClick={siguiente}
            className="flex items-center justify-center cursor-pointer text-white/80 hover:text-white transition"
          >
            <IoPlaySkipForward size={24} />
          </button>
        </div>

        {/* Info y barra de progreso */}
        <div className="flex flex-col w-full ">
          <span className="font-semibold text-lg">{audio?.title || ""}</span>

          <div
            className="relative h-1 bg-white/20 rounded cursor-pointer my-2"
            onClick={handleSeek}
          >
            <div
              className="absolute top-0 left-0 h-1 bg-primary rounded"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            ></div>
          </div>

          <div className="text-xs text-white/70 flex justify-between">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audio?.src || ""} preload="metadata" />
    </motion.div>
  );
}
