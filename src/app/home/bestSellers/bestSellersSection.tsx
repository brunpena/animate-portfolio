import ProductCard from "@/components/productCard/productCardComponent"
import { products } from "@/data/products"

export default function BestSellersSection() {
  return (
    <section
      className="best-sellers-section relative bg-gray-100 w-full h-screen min-h-[45vh] overflow-hidden"
      data-header-theme="best-sellers"
    >
      <img
        src="/endGuardanapo.png"
        alt=""
        className="absolute inset-0 w-full object-cover opacity-40"
        aria-hidden="true"
        style={{ objectPosition: "center calc(50% - 5px)" }}
      />
      
      <div className="relative z-10 w-full h-full flex items-center py-16">
        <div className="w-full max-w-360 mx-auto px-10 lg:px-20">
          <h1
            className="text-5xl flex items-center justify-center md:text-7xl font-bold mb-6 text-stone-800"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Mais Vendidos
          </h1>
          {/* <p className="text-lg md:text-xl text-stone-700 max-w-5xl leading-relaxed">
            Descubra os nossos produtos mais vendidos, cuidadosamente selecionados para oferecer a melhor experiência de café.
            Desde os clássicos até as nossas criações exclusivas, cada item é preparado com grãos de alta qualidade e paixão pelo café.
          </p> */}

          <div className="flex justify-around items-center flex-wrap gap-4 mt-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </div>
      </div>
      
    </section>
  )
}