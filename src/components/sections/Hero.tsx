import { portfolioData } from "../../data/portfolioData";
import foto1 from "../../assets/foto1.png";

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand leading-[0.9] mb-8">
              {portfolioData.name}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-brand/30" />
              <span className="text-sm uppercase tracking-[0.3em] font-semibold text-zinc-500">
                {portfolioData.title}
              </span>
            </div>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl mb-12 italic font-serif">
              "{portfolioData.bio}"
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                  Altura
                </span>
                <span className="font-medium">{portfolioData.info.altura}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                  Cabelo / Olhos
                </span>
                <span className="font-medium">
                  {portfolioData.info.cabelo} / {portfolioData.info.olhos}
                </span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                  Línguas
                </span>
                <span className="font-medium text-sm">
                  {portfolioData.info.linguas.join(", ")}
                </span>
              </div>
            </div>
          </>
        </div>

        <div className="md:col-span-5 relative">
          <div className="relative aspect-3/4 rounded-4xl overflow-hidden shadow-2xl">
            <img src={foto1} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
          </div>
        </div>
      </div>
    </section>
  );
};
