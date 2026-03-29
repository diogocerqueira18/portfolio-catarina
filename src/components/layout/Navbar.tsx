import { Menu, X } from "lucide-react";
import { sections } from "../../data/portfolioData";

type NavbarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrolled: boolean;
};

export const Navbar = ({
  isMenuOpen,
  setIsMenuOpen,
  scrolled,
}: NavbarProps) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-serif font-bold tracking-tight text-brand">
          CB
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand transition-colors"
            >
              {section.label}
            </a>
          ))}
        </div>

        {/* MOBILE */}
        <button
          className="md:hidden text-zinc-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};
