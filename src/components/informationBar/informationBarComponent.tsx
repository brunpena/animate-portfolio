"use client"

import { type ReactNode, useEffect, useId, useRef, useState } from "react"

export type InformationBarPreset = 1 | 2 | 3

const PRESETS: Record<InformationBarPreset, { bg: string; color: string; sep: string }> = {
  1: { bg: "#FFFFFF", color: "#2B4842", sep: "rgba(43,72,66,0.25)"    },
  2: { bg: "#2B2018", color: "#EFE8DC", sep: "rgba(239,232,220,0.30)" },
  3: { bg: "#EFE8DC", color: "#3D2B1F", sep: "rgba(61,43,31,0.25)"   },
}

type Props = {
  items: ReactNode[]
  preset?: InformationBarPreset
  speed?: number
  separator?: ReactNode
  className?: string
}

type GroupProps = {
  items: ReactNode[]
  separator: ReactNode
  sep: string
  aria?: boolean
}

// Fora do componente: com identidade estável, o React só atualiza as cópias em vez
// de desmontar e remontar a faixa inteira a cada render
function Group({ items, separator, sep, aria }: GroupProps) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={aria || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span
            className="whitespace-nowrap px-10"
            style={{
              fontFamily:    "var(--font-geist-sans)",
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {item}
          </span>
          <span style={{ color: sep }} className="shrink-0 select-none text-[10px]">
            {separator}
          </span>
        </span>
      ))}
    </div>
  )
}

export default function InformationBar({
  items,
  preset = 1,
  speed = 40,
  separator = "◆",
  className = "",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const groupRef  = useRef<HTMLDivElement>(null)
  // Nome único e estável (igual no servidor e no cliente) para os @keyframes
  const animName  = `ib-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`

  const [copies,   setCopies]   = useState(4)
  const [duration, setDuration] = useState(0)
  const [visible,  setVisible]  = useState(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const group   = groupRef.current
    if (!wrapper || !group) return

    const wW = wrapper.getBoundingClientRect().width
    const gW = group.getBoundingClientRect().width
    if (gW === 0) return

    // Quantas cópias para que (N-1)*gW >= wW, garantindo sem espaço vazio
    const needed = Math.ceil(wW / gW) + 2
    setCopies(Math.max(needed, 4))
    setDuration(gW / speed)
    setVisible(true)
  }, [items, speed])

  const { bg, color, sep } = PRESETS[preset]

  return (
    <div
      ref={wrapperRef}
      style={{ background: bg, color, opacity: visible ? 1 : 0 }}
      className={`w-full overflow-hidden py-4 transition-opacity duration-300 ${className}`}
    >
      {duration > 0 && (
        <style>{`
          @keyframes ${animName} {
            from { transform: translateX(0); }
            to   { transform: translateX(calc(-100% / ${copies})); }
          }
        `}</style>
      )}

      {/*
        Track com N cópias idênticas.
        A animação desloca exatamente -1 groupWidth (= -100%/N do track total).
        Ao reiniciar, o conteúdo visível é idêntico → loop sem salto.
      */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: duration > 0
            ? `${animName} ${duration}s linear infinite`
            : "none",
        }}
      >
        <div ref={groupRef}>
          <Group items={items} separator={separator} sep={sep} />
        </div>
        {Array.from({ length: copies - 1 }).map((_, i) => (
          <Group key={i} items={items} separator={separator} sep={sep} aria />
        ))}
      </div>
    </div>
  )
}
