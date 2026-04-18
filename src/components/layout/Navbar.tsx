import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../types/portfolio";

type NavbarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrolled: boolean;
  sections: Section[];
};

export const Navbar = ({
  isMenuOpen,
  setIsMenuOpen,
  scrolled,
  sections,
}: NavbarProps) => {
  const navigate = useNavigate();
  const [logoClicks, setLogoClicks] = useState(0);
  console.log(sections)

  useEffect(() => {
    if (logoClicks === 5) {
      navigate("/login");
      setLogoClicks(0)
    }
    const timer = setTimeout(() => setLogoClicks(0), 2000);
    return () => clearTimeout(timer);
  }, [logoClicks])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div onClick={() => setLogoClicks(prev => prev + 1)} className="text-xl font-serif font-bold tracking-tight text-brand cursor-default">
          CB
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          <a
              href={"#inicio"}
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand transition-colors"
            >
              Início
            </a>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand transition-colors"
            >
              {section.label}
            </a>
          ))}
          <a
              href={"#contacto"}
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand transition-colors"
            >
              Contacto
            </a>
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
