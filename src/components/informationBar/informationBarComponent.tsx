"use client"

/**
 * InformationBar — ticker de rolagem infinita, velocidade constante.
 *
 * Usa requestAnimationFrame direto no DOM (sem CSS keyframes) para garantir
 * que o scroll funcione independente de CSS processing / purge do Tailwind.
 *
 * Props:
 *   items      — array de ReactNode
 *   preset     — 1 | 2 | 3
 *   speed      — px/s  (padrão 60)
 *   separator  — ReactNode entre itens (padrão "◆")
 *   className  — classes extras no wrapper
 */

import { type ReactNode, useEffect, useRef, useState } from "react"

export type InformationBarPreset = 1 | 2 | 3

const PRESETS: Record<InformationBarPreset, { bg: string; color: string; sep: string }> = {
  1: { bg: "#FFFFFF", color: "#2B4842", sep: "rgba(43,72,66,0.25)"    },
  2: { bg: "#2B4842", color: "#FFFFFF", sep: "rgba(255,255,255,0.30)" },
  3: { bg: "#EFE8DC", color: "#3D2B1F", sep: "rgba(61,43,31,0.25)"   },
}

type Props = {
  items: ReactNode[]
  preset?: InformationBarPreset
  speed?: number
  separator?: ReactNode
  className?: string
}

export default function InformationBar({
  items,
  preset = 1,
  speed = 40,
  separator = "◆",
  className = "",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)  // div que se move
  const groupRef = useRef<HTMLDivElement>(null)  // primeiro grupo (para medir)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return

    let x = 0
    let prev = 0
    let raf: number
    let groupWidth = 0
    let shown = false

    const tick = (now: number) => {
      // Mede na primeira frame (layout já aplicado)
      if (groupWidth === 0) {
        groupWidth = group.getBoundingClientRect().width
      }

      if (groupWidth > 0) {
        const delta = prev === 0 ? 0 : now - prev
        x += (speed * delta) / 1000
        // Quando completou um grupo inteiro, reseta para loop perfeito
        if (x >= groupWidth) x -= groupWidth
        track.style.transform = `translateX(${-x}px)`

        if (!shown) {
          shown = true
          setVisible(true)
        }
      }

      prev = now
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed, items])

  const { bg, color, sep } = PRESETS[preset]

  // Itens renderizados — usados nos dois grupos idênticos
  const Items = ({ aria }: { aria?: boolean }) => (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center" aria-hidden={aria}>
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
    </>
  )

  return (
    <div
      style={{ background: bg, color, opacity: visible ? 1 : 0 }}
      className={`w-full overflow-hidden py-4 transition-opacity duration-300 ${className}`}
    >
      {/*
        Track = [Grupo A][Grupo B]  — ambos idênticos
        rAF desloca translateX(−x), onde x vai de 0 até groupWidth.
        Quando x == groupWidth, resetamos para 0 → loop sem salto.
      */}
      <div
        ref={trackRef}
        style={{ display: "flex", width: "max-content" }}
      >
        {/* Grupo A — medido via groupRef */}
        <div ref={groupRef} className="flex shrink-0 items-center">
          <Items />
        </div>

        {/* Grupo B — duplicata para loop contínuo, oculto do leitor de tela */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          <Items aria />
        </div>
      </div>
    </div>
  )
}
