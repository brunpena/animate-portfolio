export default function HeroSection() {
  return (
    <section className="hero-section relative h-screen flex items-start justify-start text-center overflow-hidden" data-header-theme="hero">
      {/* Background video */}
      <video
        className="hero-video object-cover w-full h-full fixed top-0 left-0 z-[-5]"
        src="/hero-background.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Content */}
      <div className="hero-content fixed flex flex-col text-left z-[-5] text-white px-4 w-[45vw] pt-25 mx-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Sabores que acolhem, momentos que ficam</h1>
        <p className="text-xl md:text-2xl mb-8">Mais que um café, uma experiência feita para você</p>
      </div>
    </section>
  );
}