import HeroVideo from "./heroVideo"

export default function HeroSection() {
  return (
    <section
      className="hero-section relative h-[70svh] md:h-screen overflow-hidden"
      data-header-theme="hero"
    >
      {/* Fundo: imagem no mobile, vídeo no desktop (pausa quando o hero sai da tela) */}
      <HeroVideo />

      {/* Content — fixo, centralizado dentro do max-w do site */}
      <div className="fixed inset-0 z-[-5] flex items-start justify-start pointer-events-none">
        <div className="w-full max-w-480 mx-auto px-6 md:px-10 lg:px-20">
          <div className="flex flex-col text-left text-white pt-28 md:pt-32 w-full md:w-[50vw] max-w-3xl pointer-events-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Café que <br/>compila ideias, <br/>código que flui
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8">
              O combustível de cada commit, do primeiro deploy ao último bug
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
