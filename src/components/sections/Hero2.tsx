type HeroProps = {
  data: any;
};

export const Hero2 = ({ data }: HeroProps) => {
  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-6">
            <>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand leading-[0.9] mb-8">
                {data.name}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-brand/30" />
                <span className="text-sm uppercase tracking-[0.3em] font-semibold text-zinc-500">
                  {data.title}
                </span>
              </div>
              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl mb-12 italic font-serif">
                "{data.bio}"
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    Altura
                  </span>
                  <span className="font-medium">
                    {data.info.altura}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    Cabelo / Olhos
                  </span>
                  <span className="font-medium">
                    {data.info.cabelo} / {data.info.olhos}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    Línguas
                  </span>
                  <span className="font-medium text-sm">
                    {data.info.linguas.join(", ")}
                  </span>
                </div>
              </div>
            </>
          </div>

          <div className="md:col-span-6">
            <div className="grid grid-cols-2 gap-4 h-125 md:h-150">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={data.heroImages[0].src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="row-span-2 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={data.heroImages[1].src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={data.heroImages[0].src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
