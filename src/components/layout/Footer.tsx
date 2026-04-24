import { Mail, MapPin } from "lucide-react";
import { FooterData } from "../../types/portfolio";

type FooterProps = {
  name: string;
  title: string;
  footer: FooterData;
};

export const Footer = ({ name, title, footer }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contacto" className="bg-zinc-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
              Vamos trabalhar <span className="text-brand italic">juntos?</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-md">
              {footer.text}
            </p>

            <div className="space-y-6">
              <a
                href="mailto:catarinarbduarte@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand transition-colors">
                  <Mail size={20} />
                </div>
                <span className="text-lg font-medium">{footer.email}</span>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <span className="text-lg font-medium text-zinc-400">
                  {footer.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8">
            {/* <div className="flex gap-6">
              <a
                href="#"
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all duration-300"
              >
                <CircleFadingPlus size={24}>
              </a>
            </div> */}
            <div className="text-right">
              <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
                Portfolio {currentYear}
              </p>
              <p className="text-zinc-400 font-serif italic">
                © {name} | {title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
