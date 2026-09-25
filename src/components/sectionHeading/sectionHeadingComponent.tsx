interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  tone?: "light" | "dark"
  align?: "left" | "center"
}

/**
 * Cabeçalho padrão das sections: linha + texto pequeno (eyebrow),
 * título em Playfair e subtítulo em âmbar deslocado para a direita.
 * tone="dark" é para sections de fundo marrom escuro.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "left",
}: SectionHeadingProps) {
  const isDark   = tone === "dark"
  const centered = align === "center"

  return (
    <div className={`flex flex-col ${centered ? "items-center text-center" : "items-start"}`}>
      <span
        data-reveal
        className={`mb-4 flex items-center gap-3 text-[0.65rem] md:text-xs uppercase tracking-[0.25em] ${
          isDark ? "text-[#EFE8DC]/60" : "text-stone-500"
        }`}
      >
        <span className={`h-px w-8 ${isDark ? "bg-amber-400/70" : "bg-amber-700/70"}`} />
        {eyebrow}
      </span>

      <h2
        data-reveal
        className={`text-4xl md:text-6xl font-bold leading-tight ${isDark ? "text-[#EFE8DC]" : "text-[#2B2018]"}`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          data-reveal="right"
          className={`mt-2 text-xl md:text-3xl italic ${centered ? "" : "md:pl-24"} ${
            isDark ? "text-amber-400/90" : "text-amber-700"
          }`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
