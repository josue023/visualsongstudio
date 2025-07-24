import { FaPlayCircle } from "react-icons/fa";
import { FaSoundcloud } from "react-icons/fa6";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { audios } from "../data/audios";

const textoSecciones = {
  jingles: {
    titulo: "Jingles Comerciales",
    descripcion: "Canciones sobre tu marca",
  },
  spotRadial: {
    titulo: "Spot Radial",
    descripcion: "Música de fondo para spot radial",
  },
};

export default function SeccionesAudio({
  name,
  img,
  fondo,
  setOpenAudio,
  audioActualId,
  setAudioActualId,
}) {
  const handlePlayAudio = (id) => {
    setOpenAudio(true);
    setAudioActualId(id);
  };

  const handlePlaySection = () => {
    const firstAudio = audios.find((audio) => audio.section === name);
    if (firstAudio) {
      handlePlayAudio(firstAudio.id);
    }
  };

  return (
    <section
      id={name}
      className={`px-6 py-10 ${
        fondo ? "bg-gradient-to-b from-[#000C2A] to-[#000718]" : ""
      } text-white`}
    >
      {/* Header estilo artista */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
        <img
          src={img}
          alt={name}
          className="hidden md:block w-40 h-40 rounded shadow-lg object-cover"
        />
        <div>
          <p className="uppercase text-primary text-sm font-medium">
            {name === "jingles" ? "Música Publicitaria" : "Audio Publicitario"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            {textoSecciones[name].titulo}
          </h1>
          <p className="text-white/70 mt-2">
            {textoSecciones[name].descripcion}
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex items-center space-x-6 mb-6">
        <button
          className="w-14 h-14 flex items-center justify-center cursor-pointer hover:scale-110 transition"
          onClick={handlePlaySection}
        >
          <FaPlayCircle size={60} className="text-primary" />
        </button>
        <button
          onClick={() =>
            window.open("https://soundcloud.com/visualsong-studio/tracks")
          }
          className="flex items-center cursor-pointer border px-4 py-2 rounded-full border-white text-white text-sm hover:bg-white/10"
        >
          <FaSoundcloud size={20} className="mr-2" />
          Soundcloud
        </button>
      </div>

      {/* Lista de musica */}
      <div className="space-y-4">
        {audios
          .filter((audio) => audio.section === name)
          .map((audio, index) => (
            <div
              key={audio.id}
              className="group flex items-center justify-between px-4 py-2 rounded hover:bg-white/5 transition cursor-pointer"
              onClick={() => handlePlayAudio(audio.id)}
              style={{
                backgroundColor:
                  audio.id === audioActualId && fondo
                    ? "#000"
                    : audio.id === audioActualId
                    ? "#000C2A"
                    : "",
              }}
            >
              <div className="flex items-center justify-start space-x-4 w-full">
                <div className="w-5">
                  <span
                    className={`text-white font-bold ${
                      audio.id !== audioActualId
                        ? "text-white group-hover:hidden"
                        : ""
                    }`}
                    style={{
                      color: audio.id === audioActualId ? "#eb5436" : "",
                    }}
                  >
                    {index + 1}
                  </span>
                  <IoIosPlay
                    className={`text-white ${
                      audio.id !== audioActualId
                        ? "text-white hidden group-hover:block"
                        : "hidden"
                    }`}
                  />
                </div>

                <img src={img} alt="Jingle" className="w-10 h-10 rounded" />
                <div className="flex justify-between items-center w-full">
                  <div className=" w-45 overflow-hidden">
                    <p
                      className="font-semibold text-white text-lg truncate whitespace-nowrap"
                      style={{
                        color: audio.id === audioActualId ? "#eb5436" : "",
                      }}
                    >
                      {audio.title}
                    </p>
                  </div>
                  <p className="hidden md:block text-white/60">
                    Visualsong Studio
                  </p>
                  <p className="text-white/60">{audio.duration}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
