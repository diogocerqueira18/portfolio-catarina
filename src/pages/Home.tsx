import { useEffect, useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Hero3 } from "../components/sections/Hero3";
import { PortfolioSection } from "../components/sections/PortfolioSection";
import { VideoModal } from "../components/sections/VideoModal";
import { Footer } from "../components/layout/Footer";
import { getIcon } from "../lib/getIcon";
import { usePortfolioSections } from "../hooks/usePortfolioSections";
import { useGeneralData } from "../hooks/useGeneralData";
import { BackToTop } from "../components/layout/BackToTop";

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { sections, loading: sectionsLoading } = usePortfolioSections();

  const { data, loading: generalLoading } = useGeneralData();

  const filteredSections = sections.filter((section) => section.showOnPage);

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

  if (sectionsLoading || generalLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-brand">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border.brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sections={filteredSections}
      />

      <Hero3 data={data} />

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

      {scrolled && <BackToTop />}

      <Footer name={data.name} title={data.title} footer={data.footer} />
    </div>
  );
};
