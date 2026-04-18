import { useEffect, useMemo, useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Hero3 } from "../components/sections/Hero3";
import { PortfolioSection } from "../components/sections/PortfolioSection";
import { portfolioData } from "../data/portfolioData";
import { ChevronUp, Layers, Mic, Tv, Video } from "lucide-react";
import { VideoModal } from "../components/sections/VideoModal";
import { Footer } from "../components/layout/Footer";
import { useSections } from "../hooks/useSections";
import { useVideos } from "../hooks/useVideos";
import { getIcon } from "../lib/getIcon";
import { usePortfolioSections } from "../hooks/usePortfolioSections";

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { sections, loading } = usePortfolioSections();

  const filteredSections = sections.filter((section) => section.show);
  console.log(filteredSections);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor?.hash?.startsWith("#")) {
        e.preventDefault();
        const id = anchor.hash.substring(1);
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-brand">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border.brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          {/* <p className="text-zinc-500">A carregar portfolio...</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-brand selection:text-white">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrolled={scrolled}
        sections={filteredSections}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Hero3 />

      <main className="max-w-7xl mx-auto px-6 space-y-36 pb-32">
        {filteredSections.map((section) => {
          const IconComponent = getIcon(section.icon);
          return (
            <PortfolioSection
              key={section.id}
              id={section.id!}
              title={section.label}
              icon={<IconComponent size={20} className="text-brand" />}
              items={section.videos!.map((video: any) => ({
                id: video.videoId,
                title: video.title,
                type: video.type,
              }))}
              onPlay={setActiveVideo}
            />
          );
        })}
      </main>

      <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />

      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-brand text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <Footer />
    </div>
  );
};
