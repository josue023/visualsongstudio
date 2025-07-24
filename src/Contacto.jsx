import { FaPhoneVolume } from "react-icons/fa6";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export function Contacto() {
  const formRef = useRef();
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const email = formRef.current.user_email.value;

    // Validar correo con expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setEnviado(true);
          formRef.current.reset();
          setTimeout(() => setEnviado(false), 5000);
        },
        (error) => {
          alert("Error al enviar: " + error.text);
        }
      );
  };

  return (
    <section id="contacto" className="bg-[#000C2A] px-6 py-16 text-white">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
        <p className="text-white/70 mb-8">
          ¿Quieres un jingle o música para tu proyecto? Escríbenos o llámanos.
        </p>

        <div className="group flex items-center justify-center text-lg mb-6">
          <FaPhoneVolume
            size={20}
            className="mr-2 text-white/80 group-hover:text-white group-hover:animate-bounce transition"
          />
          <a href="tel:+593988333793" className="text-primary hover:underline">
            +593 98 833 3793
          </a>
        </div>

        {/* Formulario con envío */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="space-y-4 text-left flex flex-col items-start justify-center w-full max-w-lg"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Nombre"
            required
            className="w-full px-4 py-2 rounded bg-[#000718] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="user_email"
            onChange={() => setError(false)}
            placeholder="Correo electrónico"
            required
            className="w-full px-4 py-2 rounded bg-[#000718] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && (
            <p className="text-red-400">
              Por favor, ingresa un correo electr&oacute;nico v&aacute;lido.
            </p>
          )}
          <textarea
            name="message"
            rows="4"
            placeholder="Mensaje"
            required
            className="w-full px-4 py-2 rounded bg-[#000718] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="bg-primary hover:bg-[#eb3636] text-black font-bold px-6 py-2 mt-1 rounded-full transition cursor-pointer"
          >
            Enviar mensaje
          </button>

          {enviado && (
            <p className="text-green-400 font-medium mt-2">
              ¡Mensaje enviado correctamente!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
