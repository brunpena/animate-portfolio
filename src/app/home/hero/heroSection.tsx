export default function HeroSection() {
  return (
    <section
      className="hero-section relative h-screen overflow-hidden"
      data-header-theme="hero"
    >
      {/* Background video */}
      <video
        className="hero-video object-cover w-full h-full fixed top-0 left-0 z-[-5]"
        src="/hero-background.mp4"
        autoPlay
        loop
        muted
      />

      {/* Content — fixo, centralizado dentro do max-w do site */}
      <div className="fixed inset-0 z-[-5] flex items-start justify-start pointer-events-none">
        <div className="w-full max-w-480 mx-auto px-20">
          <div className="flex flex-col text-left text-white pt-32 w-[50vw] max-w-3xl pointer-events-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Sabores que <br/>acolhem, momentos <br/>que ficam
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Mais que um café, uma experiência feita para você
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
