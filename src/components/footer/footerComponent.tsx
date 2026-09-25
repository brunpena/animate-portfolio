import Image from "next/image"
import Link from "next/link"

const columns = [
  {
    title: "Empresa",
    links: [
      { href: "#home",     label: "Home" },
      { href: "#about",    label: "Sobre" },
      { href: "#services", label: "Cardápio" },
      { href: "#contact",  label: "Contato" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { href: "#", label: "FAQ" },
      { href: "#contact", label: "Fale conosco" },
      { href: "#", label: "Onde comprar" },
    ],
  },
  {
    title: "Privacidade",
    links: [
      { href: "#", label: "Política de privacidade" },
      { href: "#", label: "Política de cookies" },
      { href: "#", label: "Termos de uso" },
    ],
  },
]

// Ícones inline para não depender de biblioteca externa
const socials = [
  {
    href: "#",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M4 9h4v11H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.6c.6-1 1.9-1.8 3.6-1.8 3 0 3.4 2 3.4 4.6V20h-4v-5.8c0-1.4 0-3-1.8-3S13.9 12.6 13.9 14V20H10z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M16 3c.3 2.3 1.7 3.8 4 4v3.2c-1.5 0-2.8-.4-4-1.2v6.2A5.8 5.8 0 1 1 10.2 9.4v3.3a2.6 2.6 0 1 0 2.6 2.6V3z" />
      </svg>
    ),
  },
]

const HEADING_CLASS = "mb-6 text-xl font-bold text-[#EFE8DC]"
const LINK_CLASS    = "group relative text-xs uppercase tracking-wide text-[#EFE8DC]/80 transition-colors duration-300 hover:text-white"

export default function Footer() {
  return (
    <footer
      className="relative z-10 w-full bg-linear-to-b from-[#3A2A1F] to-[#2B2018] text-[#EFE8DC]"
      data-header-theme="footer"
    >
      <div className="w-full max-w-360 mx-auto px-6 md:px-10 lg:px-20 pt-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[auto_1fr_1fr_1fr_auto] md:gap-12">
          {/* Logo */}
          <Link href="/" data-reveal className="col-span-2 flex items-start md:col-span-1">
            <Image src="/logo.svg" alt="Java Café" width={375} height={174} className="h-16 w-auto object-contain brightness-0 invert opacity-90" />
          </Link>

          {columns.map((col) => (
            <div key={col.title} data-reveal>
              <h3 className={HEADING_CLASS} style={{ fontFamily: "var(--font-playfair)" }}>
                {col.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={LINK_CLASS}>
                      {link.label}
                      {/* Mesmo underline animado do header */}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-300/70 transition-[width] duration-500 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Redes sociais */}
          <div data-reveal>
            <h3 className={HEADING_CLASS} style={{ fontFamily: "var(--font-playfair)" }}>
              Redes Sociais
            </h3>
            <ul className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EFE8DC]/20 bg-[#EFE8DC]/10 text-[#EFE8DC] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/60 hover:bg-[#EFE8DC] hover:text-[#2B2018]"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[#EFE8DC]/15 py-6 text-center text-xs uppercase tracking-wide text-[#EFE8DC]/60">
          © {new Date().getFullYear()} Java Café & Conceito. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
