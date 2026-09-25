"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MeetingRoom() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const decorTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });

      decorTl
        .from(".mr-circle-1", { y: -180, ease: "none" })
        .from(".mr-circle-2", { y: -180, ease: "none" }, "<0.4");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(".mr-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
        .from(
          ".mr-text",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<0.25"
        )
        .from(
          ".mr-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "<0.25"
        )
        .from(
          ".mr-image",
          {
            x: 60,
            opacity: 0,
            scale: 0.97,
            duration: 1.1,
            ease: "power3.out",
          },
          "<-0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="meeting-room-section relative z-20 py-16 h-screen flex items-center justify-center bg-white"
    >

      {/* Background image */}
      <Image src="/bgservice.webp" alt="Meeting Room" fill sizes="100vw" className="z-0 object-cover" />

      {/* objects for Decorations — círculos */}
      <div className="mr-circles object-decoretion absolute z-0 -top-15 -left-10 flex">
        <div className="mr-circle-1 w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw] bg-[#2b4741] rounded-br-[50%] rounded-bl-[50%]"></div>
        <div className="mr-circle-2 ml-[-5vw] w-[22vw] h-[22vw] md:w-[15vw] md:h-[15vw] bg-[#d56a1d] rounded-br-[50%] rounded-bl-[50%]"></div>
      </div>

      {/* J background */}
      <div className="object-decoretion hidden md:block absolute z-0 -right-20 bottom-40 translate-y-1/3">
        <Image src="/j.svg" alt="J" width={446} height={559} className="h-[120vh] w-auto" />
      </div>

      {/* conteúdo */}
      <div className="elements-page relative z-10 flex flex-col md:flex-row items-center justify-center h-full w-full px-6 md:px-22 gap-10 md:gap-20">

        {/* Esquerda: texto + CTA */}
        <div className="box-information flex flex-col gap-6 w-full md:max-w-md">
          <div className="space-text flex flex-col gap-3">
            <h2
              className="mr-title text-2xl md:text-4xl font-bold leading-tight text-[#2b4741]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Um espaço pensado para grandes decisões
            </h2>
            <p className="mr-text text-sm md:text-base text-[#2b4741]/80 leading-relaxed">
              Nossa sala de reuniões oferece ambiente profissional com tecnologia de ponta,
              ideal para apresentações, videoconferências e encontros estratégicos.
              Conforto, privacidade e infraestrutura completa para que sua equipe
              foque no que realmente importa.
            </p>
          </div>

          {/* CTA */}
          <div className="mr-cta cta flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#reservar"
              className="inline-block bg-[#d56a1d] hover:bg-[#bf5e18] text-white font-semibold text-sm md:text-base px-7 py-3 rounded-full transition-colors duration-200 shadow-md"
            >
              Reservar sala
            </a>
            <a
              href="#saiba-mais"
              className="text-[#2b4741] font-medium text-sm md:text-base underline underline-offset-4 hover:text-[#d56a1d] transition-colors duration-200"
            >
              Saiba mais
            </a>
          </div>
        </div>

        {/* Direita: imagem centralizada */}
        <div className="flex items-center justify-center w-full md:w-auto">
          <Image
            src="/meetRoom.webp"
            alt="Room"
            width={1536}
            height={1024}
            // A imagem é 3:2, então a largura exibida é 1,5× a altura (35vh / 55vh)
            sizes="(min-width: 768px) 83vh, 53vh"
            className="mr-image h-[35vh] md:h-[55vh] w-auto rounded-3xl shadow-2xl"
          />
        </div>

      </div>

    </div>
  );
}
