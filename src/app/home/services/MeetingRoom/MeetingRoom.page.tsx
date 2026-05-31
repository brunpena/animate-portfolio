export default function MeetingRoom() {
  return (
    <div className="meeting-room-section relative py-16 h-screen flex items-center justify-center bg-white">

      {/* Background image */}
      <img src="/bgservice.png" alt="Meeting Room" className="absolute inset-0 z-0 w-full h-full object-cover" />

      {/* objects for Decorations */}
      <div className="object-decoretion absolute z-0 -top-15 -left-10 flex">
        <div className="w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw] bg-[#2b4741] rounded-br-[50%] rounded-bl-[50%]"></div>
        <div className="-ml-[5vw] w-[22vw] h-[22vw] md:w-[15vw] md:h-[15vw] bg-[#d56a1d] rounded-br-[50%] rounded-bl-[50%]"></div>
      </div>

      {/* J background — oculto em mobile */}
      <div className="object-decoretion hidden md:block absolute z-0 -right-20 bottom-40 translate-y-1/3">
        <img src="/j.svg" alt="J" className="h-[120vh] w-auto" />
      </div>

      {/* conteúdo */}
      <div className="elements-page relative z-10 flex flex-col md:flex-row items-center md:justify-end justify-center h-full w-full px-6 md:px-22 gap-6 md:gap-20">

        <div className="relative w-full md:w-auto flex flex-col md:block items-center">
          <img
            src="/meetRoom.png"
            alt="Room"
            className="h-[35vh] md:h-[48vh] w-auto rounded-3xl"
          />

          {/* info card */}
          <div className="
            mt-4 w-full
            md:mt-0 md:absolute md:-left-80 md:bottom-6
            z-20 md:h-[15vh] md:min-w-[30vw]
            rounded-2xl bg-[#d56a1d]/90 backdrop-blur-sm p-4 shadow-lg
          ">
            {/* conteúdo do card aqui */}
          </div>
        </div>

      </div>

    </div>
  );
}
