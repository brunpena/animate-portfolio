import SectionHeading from "@/components/sectionHeading/sectionHeadingComponent"

type Step = {
  title: string
  description: string
  items: string[]
}

const steps: Step[] = [
  {
    title: "Seleção",
    description: "Visitamos fazendas parceiras e provamos cada lote antes de trazê-lo para a casa.",
    items: ["Pequenos produtores", "Cafés acima de 84 pontos", "Colheita rastreável"],
  },
  {
    title: "Torra",
    description: "Cada grão recebe um perfil de torra próprio para destacar suas notas naturais.",
    items: ["Lotes pequenos e semanais", "Perfis testados em cupping", "Descanso antes do uso"],
  },
  {
    title: "Preparo",
    description: "Baristas treinados ajustam moagem, dose e extração a cada turno.",
    items: ["Moagem na hora", "Água filtrada", "Receitas calibradas"],
  },
  {
    title: "Na sua xícara",
    description: "O resultado é servido com o cuidado de quem ama o que faz, do balcão à sua mesa.",
    items: ["Serviço atencioso", "Latte art", "Consistência todos os dias"],
  },
]

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="process-section relative z-10 w-full bg-[#2B2018]"
      data-header-theme="process"
    >
      <div className="w-full max-w-360 mx-auto px-6 md:px-10 lg:px-20 py-24">
        <SectionHeading
          eyebrow="Como nosso café é feito"
          title="Do Grão à Xícara"
          subtitle="o processo por trás do sabor"
          tone="dark"
        />

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className="group relative flex flex-col rounded-2xl border border-[#EFE8DC]/10 bg-[#EFE8DC]/3 p-7 transition-colors duration-300 hover:border-amber-400/40 hover:bg-[#EFE8DC]/6"
            >
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-amber-400/80">
                Etapa {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className="mt-3 text-2xl font-bold text-[#EFE8DC]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#EFE8DC]/60">{step.description}</p>

              <ul className="mt-6 flex flex-col gap-2 border-t border-[#EFE8DC]/10 pt-5">
                {step.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#EFE8DC]/80">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Número grande decorativo no canto */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-4 text-6xl font-bold text-[#EFE8DC]/5 transition-colors duration-300 group-hover:text-amber-400/10"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {i + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
