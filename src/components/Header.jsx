import { useState } from "react";
import { Menu, X } from "lucide-react"; // o cualquier icono hamburguesa

export function Header({ handleScrollToSection, img }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="p-6 bg-animated-gradient shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center space-x-2">
          <img src={img} alt="Logo" className="w-40" />
        </div>

        {/* Botón hamburguesa móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menú horizontal en escritorio */}
        <nav className="hidden md:flex space-x-6 text-sm">
          <HeaderLinks handleScrollToSection={handleScrollToSection} />
        </nav>
      </div>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <nav className="flex flex-col mt-4 space-y-4 md:hidden text-sm">
          <HeaderLinks
            handleScrollToSection={(id) => {
              handleScrollToSection(id);
              setMenuOpen(false); // Cierra el menú después de hacer clic
            }}
          />
        </nav>
      )}
    </header>
  );
}

// Extraer links para no repetirlos
function HeaderLinks({ handleScrollToSection }) {
  return (
    <>
      <button
        onClick={() => handleScrollToSection("jingles")}
        className="hover:text-primary transition cursor-pointer"
      >
        Jingles
      </button>
      <button
        onClick={() => handleScrollToSection("spotRadial")}
        className="hover:text-primary transition cursor-pointer"
      >
        Spot Radial
      </button>
      <button
        onClick={() => handleScrollToSection("videos")}
        className="hover:text-primary transition cursor-pointer"
      >
        Música en Videos
      </button>
      <button
        onClick={() => handleScrollToSection("bandas")}
        className="hover:text-primary transition cursor-pointer"
      >
        Bandas Sonoras
      </button>
      <button
        onClick={() => handleScrollToSection("contacto")}
        className="hover:text-primary transition cursor-pointer"
      >
        Contáctanos
      </button>
    </>
  );
}
