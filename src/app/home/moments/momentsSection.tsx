"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/sectionHeading/sectionHeadingComponent"

type Moment = {
  title: string
  description: string
  image: string
}

// Troque as imagens pelas fotos reais de cada momento
const moments: Moment[] = [
  { title: "Primeiro café do dia",  image: "/javacafe.webp",   description: "Um espresso encorpado para acordar o compilador interno antes da daily." },
  { title: "Trabalho remoto",       image: "/localImage.webp", description: "Mesas amplas, tomadas em todo canto e Wi-Fi que não cai no meio do deploy." },
  { title: "Reuniões e parcerias",  image: "/meetRoom.webp",   description: "Salas reservadas para reuniões, entrevistas e aquele pair programming." },
  { title: "Pausa com os amigos",   image: "/bgservice.webp",  description: "Doces da casa, bebidas autorais e um clima aconchegante para desacelerar." },
]

gsap.registerPlugin(ScrollTrigger)

// Quanto de scroll (em % da altura da tela) cada tópico consome enquanto a seção está travada
const SCROLL_PER_STEP = 80

const pad = (n: number) => String(n).padStart(2, "0")

export default function MomentsSection() {
  const [active, setActive] = useState(0)
  // O texto só anima depois da primeira troca: ao carregar ele já aparece pronto
  const [changed, setChanged] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const lastStep = moments.length - 1

  const select = (i: number) => {
    setActive(i)
    if (i !== 0) setChanged(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Trava a seção e troca o tópico ativo conforme o scroll; só libera após o último.
      // O fundo vai "aproximando" devagar durante todo o trecho travado.
      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${lastStep * SCROLL_PER_STEP}%`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.6,
        animation: gsap.fromTo(bgRef.current, { scale: 1.15 }, { scale: 1, ease: "none" }),
        snap: {
          snapTo: 1 / lastStep,
          duration: { min: 0.2, max: 0.5 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => select(Math.round(self.progress * lastStep)),
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      triggerRef.current = null
    }
  }, [lastStep])

  // Clique leva o scroll até a posição do tópico, mantendo scroll e estado sincronizados
  const goTo = (i: number) => {
    const st = triggerRef.current
    if (!st) return select(i)
    window.scrollTo({ top: st.start + (st.end - st.start) * (i / lastStep), behavior: "smooth" })
  }

  const current = moments[active]
  const textAnim = changed ? "moment-in" : ""

  return (
    <section
      ref={sectionRef}
      id="moments"
      className="moments-section relative z-10 h-svh w-full overflow-hidden bg-[#2B2018]"
      data-header-theme="moments"
    >
      {/* Fundo: fotos empilhadas em tela cheia, só a ativa aparece (fade + zoom) */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {moments.map((moment, i) => (
          <Image
            key={moment.title}
            src={moment.image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className={`object-cover transition-[opacity,scale] duration-1200 ease-out ${
              i === active ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          />
        ))}
      </div>

      {/* Escurece o fundo para o texto ficar legível */}
      <div className="absolute inset-0 bg-linear-to-t from-[#2B2018] via-[#2B2018]/70 to-[#2B2018]/40 lg:bg-linear-to-r lg:from-[#2B2018]/95 lg:via-[#2B2018]/60 lg:to-[#2B2018]/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#2B2018]/80 to-transparent" />

      {/* Texto na frente das fotos */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-360 flex-col justify-between gap-8 px-6 pt-32 pb-10 md:px-10 lg:px-20 lg:pt-36 lg:pb-16">
        <SectionHeading
          eyebrow="Quando aproveitar o Java Café"
          title="Perfeito para..."
          subtitle="cada momento do seu dia"
          tone="dark"
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          {/* key troca a cada tópico: o bloco remonta e a animação de entrada roda de novo */}
          <div key={active} className="max-w-2xl" aria-live="polite">
            <span className={`${textAnim} block text-xs tabular-nums uppercase tracking-[0.25em] text-amber-400`}>
              {pad(active + 1)} <span className="text-[#EFE8DC]/40">/ {pad(moments.length)}</span>
            </span>
            <h3
              className={`${textAnim} mt-4 text-4xl font-bold leading-tight text-[#EFE8DC] md:text-6xl`}
              style={{ fontFamily: "var(--font-playfair)", animationDelay: "80ms" }}
            >
              {current.title}
            </h3>
            <p
              className={`${textAnim} mt-4 max-w-lg text-sm leading-relaxed text-[#EFE8DC]/75 md:text-base`}
              style={{ animationDelay: "160ms" }}
            >
              {current.description}
            </p>
          </div>

          {/* Navegação: barras no mobile, lista de tópicos no desktop */}
          <ul className="flex gap-2 lg:w-72 lg:flex-col lg:gap-0">
            {moments.map((moment, i) => {
              const isActive = i === active
              return (
                <li key={moment.title} className="flex-1 lg:flex-none">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive}
                    aria-label={moment.title}
                    className="group block w-full py-3 text-left"
                  >
                    <span className="hidden items-baseline gap-4 lg:flex">
                      <span
                        className={`text-xs tabular-nums transition-colors duration-300 ${
                          isActive ? "text-amber-400" : "text-[#EFE8DC]/40"
                        }`}
                      >
                        {pad(i + 1)}
                      </span>
                      <span
                        className={`text-lg transition-colors duration-300 group-hover:text-[#EFE8DC] ${
                          isActive ? "text-[#EFE8DC]" : "text-[#EFE8DC]/45"
                        }`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {moment.title}
                      </span>
                    </span>
                    <span className="block h-0.5 w-full overflow-hidden rounded-full bg-[#EFE8DC]/15 lg:mt-3">
                      <span
                        className={`block h-full origin-left bg-amber-400 transition-transform duration-700 ease-out ${
                          i <= active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
