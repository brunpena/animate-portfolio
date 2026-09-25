"use client"

import { useEffect, useRef } from "react"
import { preload } from "react-dom"

const POSTER = "/hero-background-0.webp"
const MOBILE_IMAGE = "/heroMobile.webp"
const VIDEO_SRC = "/hero-background.mp4"
const DESKTOP_QUERY = "(min-width: 768px)"

/**
 * Fundo do hero. Ele é fixo atrás da página inteira, mas só aparece enquanto
 * o hero está na tela. No mobile é só uma imagem estática; no desktop o vídeo
 * roda por cima do poster e pausa fora do hero, liberando CPU/GPU para as
 * animações das outras seções.
 */
export default function HeroVideo() {
  // A imagem de fundo é o primeiro frame visível (LCP): baixa antes de tudo,
  // mas só a versão do breakpoint atual
  preload(POSTER, { as: "image", fetchPriority: "high", media: DESKTOP_QUERY })
  preload(MOBILE_IMAGE, { as: "image", fetchPriority: "high", media: "(max-width: 767px)" })

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const hero = video?.closest(".hero-section")
    if (!video || !hero) return

    const desktop = window.matchMedia(DESKTOP_QUERY)
    let inView = false

    // O src só é definido no desktop, então o mobile nunca baixa o vídeo
    const sync = () => {
      if (!desktop.matches) {
        video.pause()
        return
      }
      if (!video.getAttribute("src")) video.src = VIDEO_SRC
      if (inView) video.play().catch(() => {})
      else video.pause()
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })
    observer.observe(hero)
    desktop.addEventListener("change", sync)
    return () => {
      observer.disconnect()
      desktop.removeEventListener("change", sync)
    }
  }, [])

  return (
    <>
      <picture>
        <source media={DESKTOP_QUERY} srcSet={POSTER} />
        <img
          src={MOBILE_IMAGE}
          alt=""
          className="object-cover w-full h-full fixed top-0 left-0 z-[-5]"
          fetchPriority="high"
          aria-hidden
        />
      </picture>
      <video
        ref={videoRef}
        className="hero-video hidden md:block object-cover w-full h-full fixed top-0 left-0 z-[-5]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden
      />
    </>
  )
}
