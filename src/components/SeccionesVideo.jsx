import VideoCarousel from "./VideoCarousel";

const textoSecciones = {
  videos: {
    titulo: "Música en Videos",
    descripcion: "Muestra de música original ideal para acompañar videos",
  },
  bandas: {
    titulo: "Bandas Sonoras",
    descripcion: "Muestras de banda sonora compuesta para cine",
  },
};

export default function SeccionesVideo({ name, fondo }) {
  return (
    <section
      id={name}
      className={`px-6 py-10 ${
        fondo ? "bg-gradient-to-b from-[#000C2A] to-[#000718]" : ""
      } text-white`}
    >
      {/* Header estilo artista */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <div>
          <p className="uppercase text-primary text-sm font-medium">
            {name === "videos" ? "Música AudioVisual" : "Música para Cine"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            {textoSecciones[name].titulo}
          </h1>
          <p className="text-white/70 mt-2">
            {textoSecciones[name].descripcion}
          </p>
        </div>
      </div>

      {/* Lista de videos */}
      <VideoCarousel name={name} />
    </section>
  );
}
