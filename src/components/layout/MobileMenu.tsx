import React from "react";
import { Section } from "../../types/portfolio";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  sections: Section[];
};

export const MobileMenu = ({ isOpen, onClose, sections }: MobileMenuProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-8">
            <a
              href={`#inicio`}
              className="text-2xl font-serif font-medium border-b border-zinc-100 pb-4"
            >
              Início
            </a>
            {sections
              .filter((section) => section.showInNavbar)
              .map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-2xl font-serif font-medium border-b border-zinc-100 pb-4"
                >
                  {section.navbarLabel}
                </a>
              ))}
            <a
              href={`#contacto`}
              className="text-2xl font-serif font-medium border-b border-zinc-100 pb-4"
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </>
  );
};
