"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

type Feedback = {
  name: string
  role: string
  text: string
  rating: number
}

const feedbacks: Feedback[] = [
  { name: "Mariana Lopes",  role: "Dev Front-end",   rating: 5, text: "O melhor cappuccino da cidade. Meu código compila mais rápido depois da primeira xícara." },
  { name: "Rafael Souza",   role: "Tech Lead",       rating: 5, text: "Ambiente aconchegante, Wi-Fi estável e um espresso que resolve qualquer bug de segunda-feira." },
  { name: "Camila Duarte",  role: "Designer",        rating: 5, text: "Tudo é lindo aqui, do latte art à decoração. Virou meu escritório oficial." },
  { name: "Lucas Ferreira", role: "Estudante de TI", rating: 5, text: "Atendimento impecável e o pão de queijo é simplesmente sem exceptions." },
  { name: "Juliana Prado",  role: "Product Owner",   rating: 5, text: "Fiz minha daily na sala de reuniões deles. Café forte, equipe feliz, sprint entregue." },
  { name: "Pedro Almeida",  role: "Back-end Dev",    rating: 5, text: "Blend encorpado e torra perfeita. Escreva uma vez, volte todos os dias." },
]

// Linha (invisível) em "S" descendo da esquerda para a direita (mesmo desenho da referência)
const VIEWBOX_W = 940
const VIEWBOX_H = 540
const PATH_D = "M52,62 C120,200 170,258 340,260 C520,262 700,330 883,490"

// Tempo (s) para um card percorrer a linha inteira
const LOOP_DURATION = 20

// Espaço mínimo (px) entre um card e o próximo
const CARD_GAP = 24

// A lista é repetida para sempre haver cards suficientes para preencher a linha
const COPIES = 3
const items = Array.from({ length: COPIES }, () => feedbacks).flat()

// Quantidade de pontos pré-calculados da linha (evita getPointAtLength a cada frame)
const SAMPLES = 600

// Some suavemente nas pontas da linha
const fadeAt = (p: number) => Math.min(1, p / 0.08, (1 - p) / 0.08)

// Abaixo disso a linha em "S" não tem altura para mais de um card: vira carrossel
const DESKTOP_QUERY = "(min-width: 768px)"

// Conteúdo do card, usado pela linha animada (desktop) e pelo carrossel (mobile)
function FeedbackCardContent({ fb }: { fb: Feedback }) {
  return (
    <>
      <div className="mb-3 text-amber-600 text-sm" aria-label={`${fb.rating} de 5 estrelas`}>
        {"★".repeat(fb.rating)}
      </div>
      <p className="text-sm md:text-base leading-relaxed text-stone-700">“{fb.text}”</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2B2018] text-xs font-semibold text-[#EFE8DC]">
          {fb.name.split(" ").map((n) => n[0]).join("")}
        </span>
        <div>
          <p className="text-sm font-semibold text-[#2B2018]">{fb.name}</p>
          <p className="text-xs uppercase tracking-wide text-stone-500">{fb.role}</p>
        </div>
      </div>
    </>
  )
}

export default function FeedbacksSection() {
  const pathRef  = useRef<SVGPathElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(DESKTOP_QUERY, () => {
      const path  = pathRef.current
      const track = trackRef.current
      if (!path || !track) return

      const cards  = cardsRef.current.filter(Boolean) as HTMLElement[]
      const length = path.getTotalLength()

      // Tabela da linha normalizada (0–1), calculada uma única vez
      const norm = new Float32Array((SAMPLES + 1) * 2)
      for (let s = 0; s <= SAMPLES; s++) {
        const pt = path.getPointAtLength((s / SAMPLES) * length)
        norm[s * 2]     = pt.x / VIEWBOX_W
        norm[s * 2 + 1] = pt.y / VIEWBOX_H
      }

      // Valores em px, recalculados quando a tela muda de tamanho
      const px     = new Float32Array((SAMPLES + 1) * 2) // pontos da linha em px
      const dist   = new Float32Array(SAMPLES + 1)       // distância acumulada em px até cada ponto
      let lineLen  = 1                                   // comprimento da linha em px
      let spacing  = 1                                   // distância entre cards ao longo da linha
      let count    = cards.length                        // quantos cards participam do loop
      let cycle    = 1                                   // count * spacing

      const measure = () => {
        const width  = track.clientWidth
        const height = track.clientHeight

        // Maior card (sem transform, então é o tamanho real)
        const realW = Math.max(...cards.map((c) => c.offsetWidth))
        const realH = Math.max(...cards.map((c) => c.offsetHeight))
        const cardW = realW + CARD_GAP
        const cardH = realH + CARD_GAP

        // A linha ocupa o trilho descontando meio card em cada borda,
        // assim nenhum card sai do espaço da animação (nem encosta no título)
        const areaW = Math.max(0, width  - realW)
        const areaH = Math.max(0, height - realH)

        for (let s = 0; s <= SAMPLES; s++) {
          px[s * 2]     = realW / 2 + norm[s * 2] * areaW
          px[s * 2 + 1] = realH / 2 + norm[s * 2 + 1] * areaH
          dist[s] = s === 0 ? 0 : dist[s - 1] + Math.hypot(px[s * 2] - px[s * 2 - 2], px[s * 2 + 1] - px[s * 2 - 1])
        }
        lineLen = dist[SAMPLES]

        // Para cada ponto, quanto é preciso andar na linha até o próximo card não encostar.
        // O pior caso vira o espaçamento fixo: nenhum card se sobrepõe em nenhum trecho.
        let needed = 0
        let j = 0
        for (let i = 0; i <= SAMPLES; i++) {
          if (j < i) j = i
          while (
            j < SAMPLES &&
            Math.abs(px[j * 2] - px[i * 2]) < cardW &&
            Math.abs(px[j * 2 + 1] - px[i * 2 + 1]) < cardH
          ) j++
          if (j === SAMPLES) break // o resto da linha não comporta outro card
          needed = Math.max(needed, dist[j] - dist[i])
        }
        spacing = needed || lineLen

        // Cards suficientes para a linha estar sempre cheia
        count = Math.min(cards.length, Math.ceil(lineLen / spacing) + 1)
        cycle = count * spacing

        cards.forEach((card, i) => { card.style.display = i < count ? "" : "none" })
      }

      // Converte distância em px para o índice da tabela
      const indexAt = (d: number) => {
        let lo = 0
        let hi = SAMPLES
        while (lo < hi) {
          const mid = (lo + hi) >> 1
          if (dist[mid] < d) lo = mid + 1
          else hi = mid
        }
        return lo
      }

      let t = 0
      const visible = cards.map(() => true)

      // Só transform + opacity (propriedades aceleradas pela GPU, sem recalcular layout)
      const render = () => {
        for (let i = 0; i < count; i++) {
          const card = cards[i]
          const d  = (t + i * spacing) % cycle
          const on = d <= lineLen

          if (on !== visible[i]) {
            visible[i] = on
            card.style.visibility = on ? "visible" : "hidden"
          }
          if (!on) continue

          const s    = indexAt(d) * 2
          const fade = fadeAt(d / lineLen)

          card.style.opacity   = String(fade)
          card.style.transform = `translate3d(${px[s]}px, ${px[s + 1]}px, 0) translate(-50%, -50%) scale(${0.85 + fade * 0.15})`
        }
      }

      measure()
      render()

      const resizeObserver = new ResizeObserver(() => {
        const progress = t / cycle
        measure()
        t = progress * cycle
        render()
      })
      resizeObserver.observe(track)

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return () => resizeObserver.disconnect()
      }

      // Roda só quando a section está na tela
      let onScreen = false

      const tick = (_time: number, deltaMs: number) => {
        if (!onScreen) return
        t = (t + (lineLen / LOOP_DURATION) * (deltaMs / 1000)) % cycle
        render()
      }
      gsap.ticker.add(tick)

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting
      })
      intersectionObserver.observe(track)

      return () => {
        gsap.ticker.remove(tick)
        resizeObserver.disconnect()
        intersectionObserver.disconnect()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="feedbacks"
      className="feedbacks-section relative z-10 w-full md:h-svh md:min-h-140 flex flex-col overflow-hidden bg-[#F6EFE4]"
      data-header-theme="feedbacks"
    >
      <div className="relative z-10 w-full max-w-360 mx-auto px-6 md:px-10 lg:px-20 pt-24 shrink-0">
        <h2
          data-reveal
          className="text-4xl md:text-6xl font-bold mb-4 text-[#2B2018]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          O que dizem sobre nós
        </h2>
        <p data-reveal className="max-w-2xl text-xs md:text-sm uppercase tracking-wide leading-relaxed text-stone-500">
          Histórias de quem já passou pelo Java Café e voltou para mais uma xícara.
        </p>
      </div>

      {/* Mobile: faixa em loop infinito (a lista vai duplicada e desliza -50%).
          Segurar o dedo pausa; com "reduzir movimento" vira rolagem manual */}
      <div
        data-reveal="left"
        className="md:hidden overflow-hidden pt-10 pb-24 motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]"
      >
        <ul
          className="feedbacks-marquee flex w-max active:[animation-play-state:paused]"
          aria-label="Feedbacks de clientes"
        >
          {[...feedbacks, ...feedbacks].map((fb, i) => (
            <li
              key={i}
              aria-hidden={i >= feedbacks.length}
              className="mr-4 w-[80vw] max-w-xs shrink-0 rounded-2xl border border-[#2B2018]/10 bg-white/95 p-5 shadow-lg"
            >
              <FeedbackCardContent fb={fb} />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: cards percorrendo a linha em "S" */}
      <div
        ref={trackRef}
        className="relative hidden md:block w-full max-w-360 mx-auto flex-1 min-h-0 my-6"
      >
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="none"
          />
        </svg>

        <ul className="absolute inset-0" aria-label="Feedbacks de clientes">
          {items.map((fb, i) => (
            <li
              key={i}
              aria-hidden={i >= feedbacks.length}
              ref={(el) => { cardsRef.current[i] = el }}
              className="absolute left-0 top-0 w-72 rounded-2xl border border-[#2B2018]/10 bg-white/95 p-6 shadow-lg opacity-0 will-change-transform"
            >
              <FeedbackCardContent fb={fb} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
