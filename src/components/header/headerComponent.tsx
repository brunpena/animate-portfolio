"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
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
// Entrada/saída do logo e do CTA externos
const SHAPE_TRANSITION = "transition-all duration-500 ease-in-out"

// No cliente roda antes do primeiro paint pós-hidratação (evita flash);
// no servidor cai para useEffect só para não emitir warning no SSR
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

// Quanto da altura do elemento está dentro da viewport (0 → 1).
// Espelha o threshold 0.5 do IntersectionObserver, de forma síncrona.
const visibleRatio = (el: Element) => {
  const r = el.getBoundingClientRect()
  if (!r.height) return 0
  return Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)) / r.height
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

export default function Header() {
  const [island,      setIsland]      = useState(false)
  const [theme,       setTheme]       = useState<HeaderTheme>(defaultTheme)
  const [textVisible, setTextVisible] = useState(true)
  // Enquanto false, o primeiro estado é aplicado sem animação nenhuma
  const [mounted,     setMounted]     = useState(false)
  // Menu hambúrguer (só existe abaixo de lg)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const themeRef = useRef<HeaderTheme>(defaultTheme)

  const closeMenu = () => setMenuOpen(false)

  // Esc fecha o menu mobile
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])


  // ── Island ──────────────────────────────────────────────────
  // Sem .hero-section na página, a ilha é o estado padrão
  useIsomorphicLayoutEffect(() => {
    const hero = document.querySelector(".hero-section")

    // Leitura síncrona só na abertura; depois o observer avisa quando o hero
    // entra/sai da tela, sem medir layout a cada evento de scroll
    setIsland(!hero || hero.getBoundingClientRect().bottom <= 0)
    setMounted(true)

    if (!hero) return // nada para observar: a ilha fica fixa
    const observer = new IntersectionObserver(([entry]) => {
      setIsland(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0)
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  // ── Tema por section ─────────────────────────────────────────
  useIsomorphicLayoutEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]")
    let timer = 0

    // Chave não registrada (ou section sem chave) cai no tema padrão
    const themeOf = (el: Element) =>
      headerThemes[el.getAttribute("data-header-theme") ?? ""] ?? defaultTheme

    const applyTheme = (next: HeaderTheme) => {
      if (next === themeRef.current) return
      themeRef.current = next
      // Sempre usa crossfade: texto some → cores trocam → texto volta
      // Assim a cor nunca interpola visível (evita artefato de tamanho)
      setTextVisible(false)
      timer = window.setTimeout(() => {
        setTheme(next)
        setTextVisible(true)
      }, 160)
    }

    // Tema de abertura aplicado de uma vez, sem crossfade — senão a página
    // abriria no padrão claro e só trocaria 160ms depois
    const opening = Array.from(sections).find((s) => visibleRatio(s) >= 0.5)
    themeRef.current = opening ? themeOf(opening) : defaultTheme
    setTheme(themeRef.current)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            applyTheme(themeOf(entry.target))
          }
        }
      },
      { threshold: 0.5 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const motion = mounted ? SHAPE_TRANSITION : ""

  const shellStyle = {
    borderColor:     theme.navBorder,
    backgroundColor: theme.navBg,
    boxShadow:       theme.navShadow,
    transition:      mounted ? NAV_TRANSITION : "none",
  }

  const linkStyle = {
    color:         theme.linkColor,
    fontFamily:    theme.fontFamily,
    fontWeight:    theme.fontWeight,
    letterSpacing: theme.letterSpacing,
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center lg:py-5">

      {/* ── Mobile: barra fixa com logo + hambúrguer ─────────────── */}
      <div className="w-full lg:hidden">
        <div
          style={{
            borderColor:     theme.navBorder,
            backgroundColor: theme.navBg,
            boxShadow:       theme.navShadow,
            transition:      mounted ? NAV_TRANSITION : "none",
          }}
          className="relative z-10 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl sm:px-6"
        >
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image src="/logo-brown.svg" alt="Logo" width={375} height={174} loading="eager" className="h-9 w-auto object-contain" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            style={{ color: theme.linkColor }}
            className="relative flex h-11 w-11 items-center justify-center"
          >
            {/* Três linhas que viram um X */}
            <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-2"}`} />
          </button>
        </div>

        {/* Menu: desce por baixo da barra (grid-rows anima a altura sem medir via JS) */}
        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
            menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div
              style={{ backgroundColor: theme.navBg, borderColor: theme.navBorder }}
              className="border-b px-4 pb-6 pt-2 backdrop-blur-xl sm:px-6"
            >
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href} style={{ borderColor: theme.separatorColor }} className="border-b">
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      tabIndex={menuOpen ? 0 : -1}
                      style={linkStyle}
                      className="flex items-center justify-between py-4 text-lg"
                    >
                      {link.label}
                      <ArrowIcon className="size-4 opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                className="group mt-6 flex h-12 w-full items-center justify-between rounded-full bg-[#EFE8DC] pl-6 pr-1.5 text-sm font-medium tracking-wide text-[#3B2A1E] transition-colors duration-300 hover:bg-white"
              >
                Ver Cardápio
                <span className="flex size-9 items-center justify-center rounded-full bg-[#5C402E] text-[#EFE8DC] transition-transform duration-500 ease-out group-hover:-rotate-45">
                  <ArrowIcon className="size-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Container com largura máxima — logo e CTA absolutos ficam dentro dele */}
      <div className="relative mx-auto hidden w-full max-w-480 items-center justify-center px-10 lg:flex lg:px-20">

      {/* ── Logo externo ─────────────────────────────────────── */}
      <Link
        href="/"
        style={{ transitionDelay: island ? "0ms" : "200ms" }}
        className={`absolute left-10 lg:left-20 flex h-12 items-center px-5 ${motion} ${
          island ? "-translate-x-5 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        <Image src="/logo-brown.svg" alt="Logo" width={375} height={174} loading="eager" className="h-12 w-auto object-contain" />
      </Link>

      {/* ── Nav ─────────────────────────────────────────────────
          Casca: CSS transition suave de cor
          Texto: crossfade de opacidade (nunca interpola cor visível) */}
      <nav
        style={shellStyle}
        className="flex h-14 items-center rounded-full border px-6 backdrop-blur-xl"
      >
        {/* Logo interno (ilha) */}
        <div
          style={{ transitionDelay: island ? "100ms" : "0ms" }}
          className={`flex items-center overflow-hidden ${motion} ${
            island ? "max-w-40 opacity-100" : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          <Link href="/" className="flex items-center pr-3">
            <Image src="/logo-brown.svg" alt="Logo" width={375} height={174} loading="eager" className="h-7 w-auto object-contain" />
          </Link>
          <span
            style={{ backgroundColor: theme.separatorColor, transition: mounted ? SEP_TRANSITION : "none" }}
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
          className={`flex items-center overflow-hidden ${motion} ${
            island ? "max-w-56 opacity-100" : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          <span
            style={{ backgroundColor: theme.separatorColor, transition: mounted ? SEP_TRANSITION : "none" }}
            className="h-5 w-px shrink-0 mx-3"
          />
          <button
            style={{
              fontFamily:    theme.fontFamily,
              letterSpacing: theme.letterSpacing,
              opacity:       textVisible ? 1 : 0,
              transition:    "opacity 160ms ease, background-color 300ms ease",
            }}
            className="group flex h-9 items-center gap-2.5 whitespace-nowrap rounded-full bg-[#EFE8DC] pl-4 pr-1 text-sm font-medium text-[#3B2A1E] hover:bg-white"
          >
            Ver Cardápio
            <span className="flex size-7 items-center justify-center rounded-full bg-[#5C402E] text-[#EFE8DC] transition-transform duration-500 ease-out group-hover:-rotate-45">
              <ArrowIcon className="size-3.5" />
            </span>
          </button>
        </div>
      </nav>

      {/* ── CTA externo ──────────────────────────────────────── */}
      <button
        style={{ transitionDelay: island ? "0ms" : "200ms" }}
        className={`group absolute right-10 lg:right-20 flex h-14 items-center gap-4 rounded-full bg-[#EFE8DC] pl-7 pr-2 text-sm font-medium tracking-wide text-[#3B2A1E] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/60 hover:bg-white hover:shadow-[0_14px_36px_-10px_rgba(150,108,66,0.7)] ${motion} ${
          island ? "translate-x-5 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        Ver Cardápio
        <span className="flex size-10 items-center justify-center rounded-full bg-[#5C402E] text-[#EFE8DC] transition-transform duration-500 ease-out group-hover:-rotate-45">
          <ArrowIcon className="size-4" />
        </span>
      </button>

      </div>{/* fim do container max-w-360 */}
    </header>
  )
}
