import { ChevronRight, Play } from "lucide-react";
import React, { ReactNode, useState } from "react";

interface PortfolioItem {
  id: string;
  title: string;
  type?: string;
}

type PortfolioSectionProps = {
  id: string;
  title: string;
  items: readonly PortfolioItem[];
  icon: ReactNode;
  onPlay: (id: string) => void;
};

export const PortfolioSection = ({
  id,
  title,
  items,
  icon,
  onPlay,
}: PortfolioSectionProps) => {
  const [showAll, setShowall] = useState(false);
  const diplayItems = showAll ? items : items.slice(0, 2);
  const hasMore = items.length > 2;

  return (
    <section id={id} className="scrill-mt-32">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-3xl font-serif font-bold tracking-tight">
            {title}
          </h2>
        </div>
        <div className="h-px grow mx-8 bg-zinc-100 hidden md:block" />
        {hasMore && (
          // OLD VERSION
          // <button
          //   onClick={() => setShowall(!showAll)}
          //   className="text-xs uppercase tracking-widest font-semibold text-zinc-400 hover:text-brand transition-colors flex items-center gap-2"
          // >
          //   {showAll ? "Ver Menos" : "Ver Tudo"}{" "}
          //   <ChevronRight size={14} className={showAll ? "-rotate-90" : ""} />
          // </button>
          <button
            onClick={() => setShowall(!showAll)}
            className="px-5 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-100 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-brand hover:border-brand/20 hover:bg-white transition-all duration-300 flex items-center gap-3 shadow-sm active:scale-95"
          >
            {showAll ? "Ver Menos" : "Ver Tudo"}
            <ChevronRight size={14} className={showAll ? "rotate-90" : ""} />
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {diplayItems.map((item) => (
          <div
            key={item.id}
            className="group relative cursor-pointer"
            onClick={() => onPlay(item.id)}
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-100 mb-4">
              <img
                src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                  <Play className="text-white fill-white ml-1" size={24} />
                </div>
              </div>
              {item.type && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest font-bold text-white">
                    {item.type}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-xl font-medium text-zinc-800 group-hover:text-brand transition-colors">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
