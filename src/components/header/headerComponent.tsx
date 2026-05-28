"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Sobre" },
  { href: "#services", label: "Cardápio" },
  { href: "#contact", label: "Contato" },
]

export default function Header() {
  const [island, setIsland] = useState(false)

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-5">

      {/* Logo externo — some para a esquerda */}
      <Link
        href="/"
        style={{ transitionDelay: island ? "0ms" : "200ms" }}
        className={`absolute left-10 lg:left-20 flex h-12 items-center px-5 transition-all duration-500 ease-in-out ${
          island ? "-translate-x-5 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        <img src="/logo.svg" alt="Logo" className="h-12 w-auto object-contain" />
      </Link>

      {/* ── Nav — sempre visível, estica para virar a ilha ── */}
      <nav className="flex h-14 items-center rounded-full border border-white/10 bg-black/25 px-6 shadow-sm backdrop-blur-xl">

        {/* Logo interno — entra deslizando pela esquerda */}
        <div
          style={{ transitionDelay: island ? "100ms" : "0ms" }}
          className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
            island ? "max-w-40 opacity-100" : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          <Link href="/" className="flex items-center pr-3">
            <img src="/logo.svg" alt="Logo" className="h-7 w-auto object-contain" />
          </Link>
          <span className="h-5 w-px shrink-0 bg-white/15 mr-3" />
        </div>

        {/* Links — sempre visíveis */}
        <ul className="flex items-center gap-4">
          {navLinks.map((link, i) => (
            <li key={link.href} className="flex items-center gap-4">
              {i > 0 && (
                <span className="select-none text-xs text-white/20">·</span>
              )}
              <a
                href={link.href}
                className="group relative px-5 py-2 text-sm font-light tracking-wide text-white/85 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-amber-300/70 transition-all duration-500 group-hover:w-2/3" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA interno — entra deslizando pela direita */}
        <div
          style={{ transitionDelay: island ? "100ms" : "0ms" }}
          className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
            island ? "max-w-44 opacity-100" : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          <span className="h-5 w-px shrink-0 bg-white/15 ml-3" />
          <button className="flex items-center whitespace-nowrap pl-3 pr-1 text-sm font-light tracking-wide text-white/85 transition-colors duration-300 hover:text-white">
            Ver Cardápio
          </button>
        </div>
      </nav>

      {/* CTA externo — some para a direita */}
      <button
        style={{ transitionDelay: island ? "0ms" : "200ms" }}
        className={`absolute right-10 lg:right-20 flex h-14 items-center gap-4 rounded-full border border-[#243b36] bg-[#2B4842]/85 px-9 text-sm font-light tracking-wide text-white shadow-sm backdrop-blur-xl transition-all duration-500 ease-in-out hover:border-amber-300/60 hover:bg-[#2B4842] hover:shadow-[0_0_24px_rgba(43,72,66,0.5)] ${
          island ? "translate-x-5 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        Ver Cardápio
      </button>
    </header>
  )
}
