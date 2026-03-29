import React from "react";
import { sections } from "../../data/portfolioData";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-8">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-2xl font-serif font-medium border-b border-zinc-100 pb-4"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
