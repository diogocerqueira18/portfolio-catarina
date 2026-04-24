import { ChevronUp } from "lucide-react";

export const BackToTop = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-brand text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
    >
      <ChevronUp size={24} />
    </button>
  );
};
