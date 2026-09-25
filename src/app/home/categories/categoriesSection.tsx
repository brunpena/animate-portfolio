"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/sectionHeading/sectionHeadingComponent"

type Category = {
  title: string
  description: string
  tags: string[]
  image: string
  href: string
  // Cada card tem um tom da paleta, para a pilha ficar legível
  bg: string
  tone: "light" | "dark"
}

// Troque as imagens pelas fotos reais de cada categoria
const categories: Category[] = [
  {
    title: "Grãos Especiais",
    description: "Torra fresca toda semana, direto de pequenos produtores. Cafés acima de 84 pontos para moer em casa.",
    tags: ["Torra semanal", "84+ pontos", "Rastreável"],
    image: "/products/fakeProduct.webp",
    href: "#",
    bg: "#2B2018",
    tone: "dark",
  },
  {
    title: "Bebidas da Casa",
    description: "Espressos, lattes e receitas autorais preparadas por baristas que ajustam cada extração.",
    tags: ["Espresso", "Latte art", "Autorais"],
    image: "/products/fakeProduct.webp",
    href: "#",
    bg: "#EFE8DC",
    tone: "light",
  },
  {
    title: "Padaria",
    description: "Pães de fermentação natural, doces da casa e o pão de queijo que nunca lança exception.",
    tags: ["Fermentação natural", "Feito aqui", "Diário"],
    image: "/products/fakeProduct.webp",
    href: "#",
    bg: "#5C402E",
    tone: "dark",
  },
  {
    title: "Métodos & Acessórios",
    description: "V60, Chemex, prensa francesa, moedores e filtros para levar o ritual do café para casa.",
    tags: ["V60", "Chemex", "Moedores"],
    image: "/products/fakeProduct.webp",
    href: "#",
    bg: "#F6EFE4",
    tone: "light",
  },
]

gsap.registerPlugin(ScrollTrigger)

// Distância (rem) entre o topo de cada card empilhado, para as bordas aparecerem
const STACK_OFFSET = 1.25
// Fração do card que precisa estar coberta pelo próximo antes de começar a escurecer
const COVER_START = 0.3

export default function CategoriesSection() {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const ctx = gsap.context(() => {
      const items  = gsap.utils.toArray<HTMLElement>("[data-stack-item]")
      const cards  = items.map((item) => item.querySelector<HTMLElement>("[data-stack-card]")!)
      const shades = items.map((item) => item.querySelector<HTMLElement>("[data-stack-shade]")!)
      // Último progresso aplicado em cada card: evita escrever no DOM sem necessidade
      const applied = items.map(() => -1)

      // Distância entre o `top` sticky de cada card e o do próximo. Só muda no
      // resize, então é lida no refresh e não a cada frame de scroll.
      let offsets: number[] = []
      const measure = () => {
        offsets = items.map((item, i) => {
          const next = items[i + 1]
          return next ? parseFloat(getComputedStyle(next).top) - parseFloat(getComputedStyle(item).top) : 0
        })
      }

      // A cobertura é medida ao vivo nos <li> (não transformados). Medir posições
      // de elementos sticky no refresh do ScrollTrigger dá valores errados, por isso
      // o cálculo é feito a cada frame de scroll.
      const update = () => {
        items.forEach((item, i) => {
          const next = items[i + 1]
          if (!next) return
          const rect = item.getBoundingClientRect()
          const nextRect = next.getBoundingClientRect()
          const height = rect.height || 1

          // Quanto do card atual está coberto pelo próximo (0 → 1)
          const covered = gsap.utils.clamp(0, 1, (rect.bottom - nextRect.top) / height)
          // Cobertura máxima possível: o próximo para STACK_OFFSET abaixo do topo deste
          const maxCovered = Math.max(COVER_START + 0.01, (height - offsets[i]) / height)
          // Só começa a escurecer depois de 30% coberto
          const progress = gsap.utils.clamp(0, 1, (covered - COVER_START) / (maxCovered - COVER_START))

          if (progress === applied[i]) return
          applied[i] = progress
          // Escala e sombra só mexem em transform/opacity: ficam no compositor,
          // sem repintar o card (um filter: brightness() repintaria a cada frame)
          gsap.set(cards[i], { scale: 1 - 0.08 * progress })
          gsap.set(shades[i], { opacity: 0.4 * progress })
        })
      }

      ScrollTrigger.create({
        trigger: list,
        start: "top bottom",
        end: "bottom top",
        onUpdate: update,
        onRefresh: () => {
          measure()
          update()
        },
      })
      measure()
      update()
    }, list)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="categories"
      className="categories-section relative z-10 w-full bg-[#F6EFE4]"
      data-header-theme="categories"
    >
      <div className="w-full max-w-360 mx-auto px-6 md:px-10 lg:px-20 py-24 grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        {/* Título fixo ao lado enquanto os cards passam (desktop) */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Java Café & Conceito"
            title="Nossos Produtos"
            subtitle="tudo o que servimos"
          />
          <p data-reveal className="mt-6 max-w-sm text-sm leading-relaxed text-stone-500">
            Do grão selecionado ao pão saindo do forno: explore o que preparamos para acompanhar cada linha de código.
          </p>
        </div>

        <ul ref={listRef} className="flex flex-col gap-8 md:gap-12">
          {categories.map((category, i) => {
            const dark = category.tone === "dark"
            return (
              <li
                key={category.title}
                data-stack-item
                className="sticky"
                style={{ top: `calc(7rem + ${i * STACK_OFFSET}rem)` }}
              >
                <a
                  href={category.href}
                  data-stack-card
                  style={{ backgroundColor: category.bg }}
                  className="group relative flex origin-top flex-col overflow-hidden rounded-3xl shadow-[0_-10px_40px_-15px_rgba(43,32,24,0.45)] ring-1 ring-[#2B2018]/10 will-change-transform sm:flex-row sm:h-72 md:h-80"
                >
                  {/* Escurece o card quando o próximo o cobre (opacidade animada no scroll) */}
                  <span data-stack-shade aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />

                  {/* Foto do produto */}
                  <div className="relative h-44 shrink-0 overflow-hidden sm:h-full sm:w-2/5">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 40vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                  </div>

                  {/* Descrição */}
                  <div className="flex flex-1 flex-col justify-between gap-5 p-6 md:p-8">
                    <div>
                      <span className={`text-xs tabular-nums uppercase tracking-[0.25em] ${dark ? "text-amber-400/80" : "text-amber-700"}`}>
                        {String(i + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                      </span>
                      <h3
                        className={`mt-2 text-2xl md:text-4xl font-bold leading-tight ${dark ? "text-[#EFE8DC]" : "text-[#2B2018]"}`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {category.title}
                      </h3>
                      <p className={`mt-3 max-w-md text-sm leading-relaxed ${dark ? "text-[#EFE8DC]/70" : "text-stone-600"}`}>
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <ul className="flex flex-wrap gap-2">
                        {category.tags.map((tag) => (
                          <li
                            key={tag}
                            className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-wide ${
                              dark ? "border-[#EFE8DC]/20 text-[#EFE8DC]/70" : "border-[#2B2018]/15 text-stone-600"
                            }`}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-out group-hover:rotate-45 ${
                          dark ? "bg-[#EFE8DC] text-[#2B2018]" : "bg-[#2B2018] text-[#EFE8DC]"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
