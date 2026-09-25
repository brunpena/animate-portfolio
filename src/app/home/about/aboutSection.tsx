import Image from "next/image"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section relative z-10 bg-gray-100 w-full h-auto min-h-[45vh]"
      data-header-theme="about"
    >
      {/* Com "fill" a imagem sempre ocupa 100% do pai: a altura estendida
          (invade a seção de baixo) fica neste wrapper */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-full opacity-27"
        style={{ height: "calc(100% + clamp(5rem, 20vw, 45rem))" }}
      >
        <Image
          src="/guardanapoBg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 100%" }}
        />
      </div>


      <div className="relative z-10 w-full h-full flex items-center py-16">
        <div className="w-full max-w-360 mx-auto px-6 md:px-10 lg:px-20">
          <h1
            data-reveal
            className="text-5xl md:text-7xl font-bold mb-6 text-stone-800"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Sobre Nós
          </h1>
          <p data-reveal className="text-lg md:text-xl text-stone-700 max-w-5xl leading-relaxed">
            O Java Café nasceu em 1995, quando um grupo de desenvolvedores percebeu que nenhuma linha de código
            compilava sem uma boa xícara ao lado. Desde então, torramos nossos grãos com a mesma filosofia da
            linguagem: escreva uma vez, saboreie em qualquer lugar. Cada blend passa por um rigoroso garbage
            collector que elimina tudo o que não agrega sabor, e nossa torra é orientada a objetos: cada grão
            herda o melhor da sua origem. Aqui, nenhum pedido lança exception. Só café forte, encorpado e
            pronto para rodar em qualquer JVM (Java Very Morning).
          </p>
        </div>
      </div>
    </section>
  )
}
