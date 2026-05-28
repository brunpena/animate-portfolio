"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { defaultTheme, headerThemes, type HeaderTheme } from "./headerThemes"

const navLinks = [
  { href: "#home",     label: "Home" },
  { href: "#about",    label: "Sobre" },
  { href: "#services", label: "Cardápio" },
  { href: "#contact",  label: "Contato" },
]

// Só a casca do nav (borda + fundo) usa CSS transition — nunca o texto
const NAV_TRANSITION   = "background-color 500ms ease, border-color 500ms ease, box-shadow 500ms ease"
// Separadores internos (linhas divisórias)
const SEP_TRANSITION   = "background-color 500ms ease"

export default function Header() {
  const [island,      setIsland]      = useState(false)
  const [theme,       setTheme]       = useState<HeaderTheme>(defaultTheme)
  const [textVisible, setTextVisible] = useState(true)

  // ── Island ──────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const hero = document.querySelector(".hero-section")
      if (!hero) return
      setIsland(hero.getBoundingClientRect().bottom <= 0)
    }
    check()
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [])

  // ── Tema por section ─────────────────────────────────────────
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]")

    const applyTheme = (key: string) => {
      const next = headerThemes[key] ?? defaultTheme
      // Sempre usa crossfade: texto some → cores trocam → texto volta
      // Assim a cor nunca interpola visível (evita artefato de tamanho)
      setTextVisible(false)
      setTimeout(() => {
        setTheme(next)
        setTextVisible(true)
      }, 160)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            applyTheme(entry.target.getAttribute("data-header-theme") ?? "hero")
          }
        }
      },
      { threshold: 0.5 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-5">

      {/* Container com largura máxima — logo e CTA absolutos ficam dentro dele */}
      <div className="relative mx-auto flex w-full max-w-480 items-center justify-center px-10 lg:px-20">

      {/* ── Logo externo ─────────────────────────────────────── */}
      <Link
        href="/"
        style={{ transitionDelay: island ? "0ms" : "200ms" }}
        className={`absolute left-10 lg:left-20 flex h-12 items-center px-5 transition-all duration-500 ease-in-out ${
          island ? "-translate-x-5 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        <img src="/logo.svg" alt="Logo" className="h-12 w-auto object-contain" />
      </Link>

      {/* ── Nav ─────────────────────────────────────────────────
          Casca: CSS transition suave de cor
          Texto: crossfade de opacidade (nunca interpola cor visível) */}
      <nav
        style={{
          borderColor:     theme.navBorder,
          backgroundColor: theme.navBg,
          boxShadow:       theme.navShadow,
          transition:      NAV_TRANSITION,
        }}
        className="flex h-14 items-center rounded-full border px-6 backdrop-blur-xl"
      >
        {/* Logo interno (ilha) */}
        <div
          style={{ transitionDelay: island ? "100ms" : "0ms" }}
          className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
            island ? "max-w-40 opacity-100" : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          <Link href="/" className="flex items-center pr-3">
            <img src="/logo.svg" alt="Logo" className="h-7 w-auto object-contain" />
          </Link>
          <span
            style={{ backgroundColor: theme.separatorColor, transition: SEP_TRANSITION }}
            className="h-5 w-px shrink-0 mr-3"
          />
        </div>

        {/* Links — opacidade controla a troca, cor troca instantaneamente */}
        <ul
          style={{ opacity: textVisible ? 1 : 0, transition: "opacity 160ms ease" }}
          className="flex items-center gap-4"
        >
          {navLinks.map((link, i) => (
            <li key={link.href} className="flex items-center gap-4">
              {i > 0 && (
                <span style={{ color: theme.dotColor }} className="select-none text-xs">
                  ·
                </span>
              )}
              <a
                href={link.href}
                style={{
                  color:         theme.linkColor,
                  fontFamily:    theme.fontFamily,
                  fontWeight:    theme.fontWeight,
                  letterSpacing: theme.letterSpacing,
                  // sem transition de cor aqui — a opacidade da <ul> cuida da troca
                }}
                className="group relative px-5 py-2 text-sm"
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.linkHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.linkColor)}
              >
                {link.label}
                <span
                  style={{ backgroundColor: theme.underlineColor }}
                  className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 transition-[width] duration-500 group-hover:w-2/3"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA interno (ilha) */}
        <div
          style={{ transitionDelay: island ? "100ms" : "0ms" }}
          className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
            island ? "max-w-44 opacity-100" : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          <span
            style={{ backgroundColor: theme.separatorColor, transition: SEP_TRANSITION }}
            className="h-5 w-px shrink-0 ml-3"
          />
          <button
            style={{
              color:         theme.linkColor,
              fontFamily:    theme.fontFamily,
              fontWeight:    theme.fontWeight,
              letterSpacing: theme.letterSpacing,
              opacity:       textVisible ? 1 : 0,
              transition:    "opacity 160ms ease",
            }}
            className="flex items-center whitespace-nowrap pl-3 pr-1 text-sm"
          >
            Ver Cardápio
          </button>
        </div>
      </nav>

      {/* ── CTA externo ──────────────────────────────────────── */}
      <button
        style={{ transitionDelay: island ? "0ms" : "200ms" }}
        className={`absolute right-10 lg:right-20 flex h-14 items-center gap-4 rounded-full border border-[#243b36] bg-[#2B4842]/85 px-9 text-sm font-light tracking-wide text-white shadow-sm backdrop-blur-xl transition-all duration-500 ease-in-out hover:border-amber-300/60 hover:bg-[#2B4842] hover:shadow-[0_0_24px_rgba(43,72,66,0.5)] ${
          island ? "translate-x-5 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        Ver Cardápio
      </button>

      </div>{/* fim do container max-w-360 */}
    </header>
  )
}
