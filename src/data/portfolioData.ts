import foto1 from "../assets/0F1A70191.png";
import foto2 from "../assets/0F1A7084.png";
import foto3 from "../assets/0F1A7136.png";

export const sections = [
  { id: 'inicio', label: "Início"},
  { id: 'representacao', label: "Representação"},
  { id: 'dobragem', label: "Dobragem"},
  { id: 'publicidade', label: "Publicidade"},
  { id: 'outros', label: "Outros"},
  { id: 'contacto', label: "Contacto"},
] as const;

export const portfolioData = {
  name: "Catarina Barrelas",
  title: "Atriz & Dobradora",
  bio: "Comecei pequenina no Teatro, viajei pela Dança e Apresentação e mais recentemente descobri a Dobragem. Bem-vindos ao meu portfólio, um reflexo do meu percurso e da minha paixão pela arte de contar histórias",
  heroImages: [
    { src: foto1},
    { src: foto2},
    { src: foto3}
  ],
  info: {
    altura: "1.60m",
    cabelo: "Loiro",
    olhos: "Verdes",
    linguas: ["Português (Nativo)", "Inglês (Fluente)"],
    skills: ["Dança Contemporânea", "Apresentação", "Carta B"],
  },
  projects: {
    representacao: [
      { id: "2cm-kheSfIU", title: "Showreel Representação", type: "Cena"},
      { id: "hOJB_qD8GKI", title: "A discussão - Cena Showreel", type: "Cena"},
      { id: "vApEUOop4ek", title: "O plano - Cena Showreel", type: "Cena"},
    ],
    dobragem: [
      { id: "J7_E_8UhdWE", title: "Narração Trailer Cinema", type: "Narração" },
      { id: "4zE7jK_Uv_I", title: "Dobragem - Pong", type: "Voz"},
    ],
    publicidade: [
      { id: "AKBAa06e2pA", title: "Publicidade Televisão", type: "Exercício" },
      { id: "BkV9abhiMOc", title: "Spot Publicidade Rádio", type: "Exercício" },
    ],
    outros: [
      { id: "hV0sIC0iYz0", title: "Futurália" },
      { id: "x4-HpqDdeA8", title: "Reels/Tiktok" },
    ]
  },
} as const;