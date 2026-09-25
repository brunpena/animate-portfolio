"use client"

import { useState, type FormEvent } from "react"

export default function NewsletterSection() {
  const [email,      setEmail]      = useState("")
  const [subscribed, setSubscribed] = useState(false)

  // Sem backend por enquanto: só confirma a inscrição na tela
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail("")
  }

  return (
    <section
      id="contact"
      className="newsletter-section relative z-10 w-full overflow-hidden bg-linear-to-b from-[#F6EFE4] via-[#EFE8DC] to-[#E6D5BF]"
      data-header-theme="newsletter"
    >
      {/* Brilho suave no fundo, igual ao degradê da referência */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#D9BFA0]/60 to-transparent" />

      <div className="relative z-10 w-full max-w-360 mx-auto px-6 md:px-10 lg:px-20 py-24 flex flex-col items-center text-center">
        <h2
          data-reveal
          className="text-4xl md:text-6xl font-bold mb-6 text-[#2B2018]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Assine nossa Newsletter
        </h2>

        <p data-reveal className="max-w-3xl text-xs md:text-sm uppercase tracking-wide leading-relaxed text-stone-500">
          Bem-vindo à newsletter do Java Café — sua dose mensal de aromas intensos, clima aconchegante e
          histórias que aquecem a alma. Dos nossos novos blends e dicas de barista a ofertas exclusivas,
          fique conectado ao café que você mais ama.
        </p>

        <form
          data-reveal
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-2xl flex-col gap-4 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Seu e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="h-14 w-full min-w-0 shrink-0 appearance-none rounded-xl border border-[#2B2018]/10 bg-[#E8DCCB]/70 px-6 text-base sm:flex-1 sm:text-sm tracking-wide text-[#2B2018] placeholder:text-xs placeholder:uppercase placeholder:text-[#2B2018]/60 outline-none transition-colors duration-300 focus:border-amber-700/50 focus:bg-[#E8DCCB]"
          />
          <button
            type="submit"
            className="group flex h-14 w-full shrink-0 items-center justify-center gap-4 sm:w-auto rounded-xl bg-[#2B2018] pl-7 pr-3 text-xs uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Inscrever-se
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EFE8DC] text-[#2B2018] transition-transform duration-300 group-hover:rotate-45">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </span>
          </button>
        </form>

        <p
          aria-live="polite"
          className={`mt-4 text-sm text-[#2B4842] transition-opacity duration-500 ${subscribed ? "opacity-100" : "opacity-0"}`}
        >
          Inscrição confirmada! Em breve você recebe nosso próximo café. ☕
        </p>
      </div>
    </section>
  )
}
