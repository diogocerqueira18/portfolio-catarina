import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { MobileMenu } from "./components/layout/MobileMenu";
import { Hero } from "./components/sections/Hero";
import { PortfolioSection } from "./components/sections/PortfolioSection";
import { ChevronUp, Mic, Tv, Video } from "lucide-react";
import { portfolioData } from "./data/portfolioData";
import { VideoModal } from "./components/sections/VideoModal";
import { Footer } from "./components/layout/Footer";
import { Hero2 } from "./components/sections/Hero2";
import { Hero3 } from "./components/sections/Hero3";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll)

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor?.hash?.startsWith("#")) {
        e.preventDefault();
        const id = anchor.hash.substring(1);
        document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleAnchorClick)
    }

  }, [])

  return (
    <div className="minh-h-screen font-sans selection:bg-brand selection:text-white">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrolled={scrolled}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Hero3 />

      <main className="max-w-7xl mx-auto px-6 space-y-36 pb-32">
        <PortfolioSection
          id="representacao"
          title="Representação"
          icon={<Video className="text-brand" size={20} />}
          items={portfolioData.projects.representacao}
          onPlay={setActiveVideo}
        />

        <PortfolioSection
          id="dobragem"
          title="Dobragem"
          icon={<Mic className="text-brand" size={20} />}
          items={portfolioData.projects.dobragem}
          onPlay={setActiveVideo}
        />

        <PortfolioSection
          id="publicidade"
          title="Publicidade"
          icon={<Tv className="text-brand" size={20} />}
          items={portfolioData.projects.publicidade}
          onPlay={setActiveVideo}
        />
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
}

export default App;
