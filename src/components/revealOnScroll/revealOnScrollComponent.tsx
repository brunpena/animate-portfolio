"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Anima a entrada de qualquer elemento com o atributo data-reveal
 * quando ele chega na tela. Elementos que entram juntos saem em cascata.
 *
 *   data-reveal          → sobe (padrão)
 *   data-reveal="left"   → vem da esquerda
 *   data-reveal="right"  → vem da direita
 *   data-reveal="scale"  → cresce
 *   data-reveal="fade"   → só aparece
 *
 * Nada fica escondido antes do JS: o conteúdo já vem visível do servidor.
 * Só o que está abaixo da tela ao carregar ganha animação; o que o usuário
 * já está vendo nunca some nem pisca.
 */
const FROM: Record<string, gsap.TweenVars> = {
  up:    { y: 48 },
  left:  { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.92, y: 24 },
  fade:  {},
}

export default function RevealOnScroll() {
  // Roda de novo a cada troca de página (o layout não remonta)
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Só anima quem ainda está abaixo da tela
    const elements = gsap.utils
      .toArray<HTMLElement>("[data-reveal]")
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight)
    if (!elements.length) return

    elements.forEach((el) => {
      gsap.set(el, { autoAlpha: 0, ...(FROM[el.dataset.reveal || "up"] ?? FROM.up) })
    })

    const triggers = ScrollTrigger.batch(elements, {
      start: "top 88%",
      once: true,
      interval: 0.1,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          overwrite: true,
          // Limpa tudo no fim: hovers e sticky voltam a valer normalmente
          clearProps: "transform,opacity,visibility",
        }),
    })

    return () => triggers.forEach((t) => t.kill())
  }, [pathname])

  return null
}
