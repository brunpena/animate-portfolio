interface ProductCardProps {
  image: string
  name: string
  pts: number
  tipo: string
  variedade: string
  processo: string
  notas: string
  price: number
}

export default function ProductCard({
  image,
  name,
  pts,
  tipo,
  variedade,
  processo,
  notas,
  price,
}: ProductCardProps) {
  return (
    <div
      className="group relative shrink-0 cursor-pointer"
      style={{
        width: "clamp(17.5rem, 22vw, 26rem)",
        paddingTop: "clamp(2.5rem, 6vh, 4rem)",
      }}
    >
      {/* Card */}
      <div
        className="bg-[#EFE8DC] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:shadow-2xl flex flex-col"
        style={{ height: "clamp(26rem, 48vh, 36rem)" }}
      >
        {/* Triângulo marrom */}
        <div
          className="relative"
          style={{ height: "clamp(7rem, 16vh, 11rem)" }}
        >
          <div
            className="absolute inset-0 bg-[#2B2018] transition-opacity duration-300 group-hover:opacity-90"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        </div>

        {/* Conteúdo */}
        <div
          className="flex flex-col flex-1 justify-between"
          style={{
            gap: "clamp(0.375rem, 0.8vh, 0.625rem)",
            padding: "clamp(1rem, 2vw, 1.5rem)",
            paddingBottom: "clamp(1.25rem, 2.5vh, 1.75rem)",
          }}
        >
          {/* Nome + pts */}
          <div className="flex items-start justify-between gap-2">
            <h2
              className="font-bold text-stone-800 leading-tight truncate transition-colors duration-300 group-hover:text-amber-900"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              }}
            >
              {name}
            </h2>
            <span
              className="font-semibold text-amber-700 bg-amber-100 rounded-full whitespace-nowrap shrink-0 transition-colors duration-300 group-hover:bg-amber-200"
              style={{
                fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
                padding: "clamp(0.2rem, 0.5vh, 0.35rem) clamp(0.4rem, 1vw, 0.6rem)",
                marginTop: "0.125rem",
              }}
            >
              {pts} pts
            </span>
          </div>

          {/* Tipo e variedade */}
          <p
            className="text-stone-500 leading-snug truncate"
            style={{ fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)" }}
          >
            {tipo} &nbsp;|&nbsp; {variedade}
          </p>

          {/* Processo */}
          <span
            className="self-start font-medium text-stone-600 bg-stone-200 rounded-full max-w-full truncate transition-colors duration-300 group-hover:bg-stone-300"
            style={{
              fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
              padding: "clamp(0.15rem, 0.4vh, 0.25rem) clamp(0.5rem, 1.2vw, 0.8rem)",
            }}
          >
            {processo}
          </span>

          {/* Notas */}
          <p
            className="text-stone-600 leading-relaxed border-t border-stone-300 line-clamp-3"
            style={{
              fontSize: "clamp(0.75rem, 1.1vw, 0.875rem)",
              paddingTop: "clamp(0.5rem, 1vh, 0.875rem)",
              marginTop: "clamp(0.2rem, 0.5vh, 0.4rem)",
            }}
          >
            {notas}
          </p>

          {/* Preço */}
          <p
            className="font-bold text-stone-800 transition-colors duration-300 group-hover:text-amber-900"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
            }}
          >
            R$ {price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Imagem flutuando acima */}
      <img
        src={image}
        alt={name}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-auto object-contain drop-shadow-2xl transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:scale-105 group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
        style={{ height: "clamp(8rem, 25vh, 14rem)" }}
      />
    </div>
  )
}
