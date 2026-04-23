const ProgramSection = ({ data, index }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2, rootMargin: "0px" });
  const isEven = index % 2 === 0;

  return (
    <section className={`py-12 lg:py-24 w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center relative z-10 border-b border-white/5 hover:bg-red-950/10 transition-all duration-500 overflow-hidden`}>
      
      {/* --- BACKGROUND WATERMARK NUMBERING --- */}
      <span className={`absolute font-black italic leading-none select-none pointer-events-none transition-all duration-1000 delay-300 z-0 ${
        isVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-150'
      } ${isEven ? '-right-10 text-red-600' : '-left-10 text-neutral-800'} text-[12rem] md:text-[20rem] lg:text-[25rem]`}>
        0{index + 1}
      </span>

      {/* --- IMAGE CONTAINER --- */}
      <div className="w-full lg:w-1/2 h-[350px] lg:h-[500px] relative overflow-hidden group px-4 lg:px-12 z-10">
        <div className="w-full h-full relative overflow-hidden shadow-2xl rounded-sm border border-white/5">
          <img 
            src={data.image} 
            alt={data.title} 
            className="absolute w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div ref={ref} className="w-full lg:w-1/2 p-6 lg:p-16 flex flex-col justify-center relative z-20">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter mb-4 leading-[0.85]">
            {data.title}
          </h2>

          <div className="w-20 h-1.5 bg-red-600 mb-8 skew-x-[-20deg]"></div>
          
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-light">
            {data.desc}
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {data.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center text-white font-bold text-xs md:text-sm uppercase tracking-widest">
                <div className="w-2 h-2 bg-red-600 mr-3 rotate-45 flex-shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
                {benefit}
              </li>
            ))}
          </ul>

          <button className="self-start px-10 py-4 bg-red-600 text-white font-black italic text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-lg active:scale-95">
            Start This Program
          </button>
        </div>
      </div>
    </section>
  );
};