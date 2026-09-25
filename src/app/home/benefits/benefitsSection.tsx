import type { ReactNode } from "react"
import Image from "next/image"
import SectionHeading from "@/components/sectionHeading/sectionHeadingComponent"

type Benefit = {
  title: string
  description: string
  icon: ReactNode
}

const iconProps = {
  viewBox: "0 0 24 24",
  className: "h-5 w-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

// Ícones inline para não depender de biblioteca externa
const benefits: Benefit[] = [
  {
    title: "Grãos selecionados",
    description: "Cafés especiais com pontuação acima de 84, escolhidos direto de pequenos produtores.",
    icon: (
      <svg {...iconProps}>
        <ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(35 12 12)" />
        <path d="M8 18c3-3 5-9 8-12" />
      </svg>
    ),
  },
  {
    title: "Torra artesanal",
    description: "Torramos em pequenos lotes toda semana para garantir frescor e aroma em cada xícara.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3c2 3-1 4 1 7M8 6c1.5 2-.5 3 1 5M16 6c1.5 2-.5 3 1 5" />
        <path d="M4 14h16l-1.5 5a2 2 0 0 1-2 1.5h-9a2 2 0 0 1-2-1.5L4 14Z" />
      </svg>
    ),
  },
  {
    title: "Ambiente para focar",
    description: "Wi-Fi rápido, tomadas em todas as mesas e um clima pensado para quem trabalha e estuda.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M2 20h20M9 9l-2 2 2 2M15 9l2 2-2 2" />
      </svg>
    ),
  },
  {
    title: "Origem sustentável",
    description: "Comércio justo com os produtores e embalagens recicláveis do grão ao copo.",
    icon: (
      <svg {...iconProps}>
        <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
        <path d="M5 19c3-4 6-7 10-9" />
      </svg>
    ),
  },
]

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="benefits-section relative z-10 w-full bg-[#EFE8DC]"
      data-header-theme="benefits"
    >
      <div className="w-full max-w-360 mx-auto px-6 md:px-10 lg:px-20 py-24 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Por que o Java Café"
            title="Nossos Diferenciais"
            subtitle="em cada xícara"
          />

          <p data-reveal className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-stone-600">
            Mais do que café: um lugar feito para quem gosta de qualidade, de boas conversas e de código que compila de primeira.
          </p>

          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit.title} data-reveal className="group">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2B2018]/15 text-amber-700 transition-colors duration-300 group-hover:bg-[#2B2018] group-hover:text-[#EFE8DC]">
                  {benefit.icon}
                </span>
                <h3 className="mt-4 text-base font-semibold text-[#2B2018]">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{benefit.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Imagem com chamada para a loja, como na referência */}
        <div data-reveal="scale" className="group relative aspect-4/5 w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-auto lg:h-full lg:min-h-140">
          <Image
            src="/theJava.webp"
            alt="Pessoas trabalhando no Java Café"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#2B2018]/85 via-[#2B2018]/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-8">
            <div>
              <p
                className="text-3xl md:text-4xl font-bold text-[#EFE8DC]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Visite a loja
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#EFE8DC]/70">
                Rua das Flores, 123 - Centro
              </p>
            </div>
            <a
              href="#contact"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFE8DC] text-[#2B2018] transition-transform duration-300 hover:rotate-45"
              aria-label="Como chegar"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
