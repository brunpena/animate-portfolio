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
    <div className="group relative w-88 shrink-0 pt-14 cursor-pointer">
      {/* Card */}
      <div className="bg-[#EFE8DC] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:shadow-2xl">
        {/* Triângulo marrom */}
        <div className="relative h-40">
          <div
            className="absolute inset-0 bg-[#2B2018] transition-all duration-300 group-hover:opacity-90"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col gap-2 p-5 pb-6">
          <div className="flex items-start justify-between gap-2">
            <h2
              className="text-xl font-bold text-stone-800 leading-tight truncate transition-colors duration-300 group-hover:text-amber-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {name}
            </h2>
            <span className="text-xs font-semibold text-amber-700 bg-amber-100 rounded-full px-2 py-1 whitespace-nowrap mt-0.5 shrink-0 transition-colors duration-300 group-hover:bg-amber-200">
              {pts} pts
            </span>
          </div>

          <p className="text-xs text-stone-500 leading-snug truncate">
            {tipo} &nbsp;|&nbsp; {variedade}
          </p>

          <span className="self-start text-xs font-medium text-stone-600 bg-stone-200 rounded-full px-3 py-0.5 max-w-full truncate transition-colors duration-300 group-hover:bg-stone-300">
            {processo}
          </span>

          <p className="text-sm text-stone-600 leading-relaxed border-t border-stone-300 pt-3 mt-1 line-clamp-3">
            {notas}
          </p>

          <p
            className="text-2xl font-bold text-stone-800 mt-4 transition-colors duration-300 group-hover:text-amber-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            R$ {price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Imagem flutuando — sobe junto com o card e escala levemente */}
      <img
        src={image}
        alt={name}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-[30vh] w-auto object-contain drop-shadow-2xl transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:scale-105 group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
      />
    </div>
  )
}
