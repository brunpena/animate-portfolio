export default function AboutSection() {
  return (
    <section
      className="about-section relative z-10 bg-gray-100 w-full h-auto min-h-[45vh]"
      data-header-theme="about"
    >
      <img
        src="/guardanapoBg.webp"
        alt=""
        className="absolute top-0 left-0 w-full object-cover opacity-27"
        style={{ height: "calc(100% + 30rem)", objectPosition: "center 250%" }}
      />
      

      <div className="relative z-10 w-full h-full flex items-center py-16">
        <div className="w-full max-w-360 mx-auto px-10 lg:px-20">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-stone-800"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Sobre Nós
          </h1>
          <p className="text-lg md:text-xl text-stone-700 max-w-5xl leading-relaxed">
            O Java Café e Conceito é uma cafeteria que oferece café de grãos especiais e produtos de altíssima qualidade.
            Nosso cardápio é cuidadosamente elaborado para proporcionar uma experiência única aos nossos clientes.
            Além disso, nosso atendimento é impecável, garantindo que você se sinta especial em cada visita.
          </p>
        </div>
      </div>
    </section>
  )
}
