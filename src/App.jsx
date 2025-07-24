import { Button } from "./components/ui/button";
import Logo from "./assets/logo-vss.png";
import jingle from "./assets/jingle.jpg";
import spotRadial from "./assets/spot_radial.jpg";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import SeccionesAudio from "./components/SeccionesAudio";
import SeccionesVideo from "./components/SeccionesVideo";
import { Contacto } from "./Contacto";
import AnimacionMusic from "./components/animacionMusic";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import Reproductor from "./components/Reproductor";

export default function VisualsongStudio() {
  const [openAudio, setOpenAudio] = useState(false);
  const [audioActualId, setAudioActualId] = useState(0);

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className=" min-h-screen bg-[#00000e] text-white font-sans">
      {/* Reproductor */}
      <AnimatePresence>
        {openAudio && (
          <Reproductor
            src={"/audio/boda.mp3"}
            title="Boda"
            openAudio={openAudio}
            setOpenAudio={setOpenAudio}
            audioActualId={audioActualId}
            setAudioActualId={setAudioActualId}
          />
        )}
      </AnimatePresence>

      {/* Sidebar-like Header */}
      <Header handleScrollToSection={handleScrollToSection} img={Logo} />

      {/* Hero */}
      <section className="relative overflow-hidden h-[500px] px-6 py-45 text-center bg-animated-gradient">
        {/* TEXTO: aparece de izquierda a derecha, sincronizado con el disco */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Tu historia merece sonar inolvidable
          </h1>
          <p className="text-white/70 mb-6">
            Creamos jingles y música original para marcas y producciones
            audiovisuales
          </p>
          <Button
            className="bg-primary hover:bg-primary/90 hover:scale-105 transition text-black font-bold cursor-pointer"
            onClick={() => handleScrollToSection("jingles")}
          >
            Explorar Portafolio
          </Button>
        </motion.div>

        {/* DISCO animado (AnimacionMusic) desplazándose de izquierda a derecha */}
        <motion.div
          className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[-200px] z-0"
          animate={{ x: "120vw" }}
          transition={{
            duration: 5,
            ease: "linear",
          }}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-[150px] h-[20px] bg-black/40 rounded-full blur-sm absolute top-88 left-1/2 transform -translate-x-1/2 z-[-1]" />
            <AnimacionMusic />
          </div>
        </motion.div>
      </section>

      <main className="py-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
        {/* Content Sections */}
        <SeccionesAudio
          name="jingles"
          img={jingle}
          fondo={true}
          setOpenAudio={setOpenAudio}
          audioActualId={audioActualId}
          setAudioActualId={setAudioActualId}
        />
        <SeccionesAudio
          name="spotRadial"
          img={spotRadial}
          fondo={false}
          setOpenAudio={setOpenAudio}
          audioActualId={audioActualId}
          setAudioActualId={setAudioActualId}
        />
        <SeccionesVideo name="videos" fondo={false} />
        <SeccionesVideo name="bandas" fondo={true} />
      </main>
      {/* Contacto */}
      <Contacto />
      {/* Footer with Socials */}
      <footer className="text-center py-6 border-t border-white/10 text-white/60 text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://www.instagram.com/visualsongstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61578127236747"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FiFacebook size={20} />
          </a>
          <a
            href="https://www.youtube.com/@VisualSongStudio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FiYoutube size={20} />
          </a>
        </div>
        © 2025 Visualsong Studio. Todos los derechos reservados.
      </footer>
    </div>
  );
}
