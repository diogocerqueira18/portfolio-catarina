export interface Video {
  id?: string;
  title: string;
  type: string;
  youtubeUrl: string;
  videoId: string;
  order?: number;
}

export interface Section {
  id?: string;
  label: string;
  navbarLabel: string;
  showInNavbar: boolean;
  showOnPage: boolean;
  icon: string;
  order: number;
  videoCount: number;
  videos?: Video[];
}

export interface EditSectionForm {
  label: string;
  icon: string;
  navbarLabel: string;
}

export interface GeneralData {
  name: string;
  title: string;
  bio: string;
  info: {
    altura: string;
    cabelo: string;
    olhos: string;
    linguas?: string[];
    // skills?: string[];
  };
  footer: FooterData;
  heroImages: Array<{ src: string }>;
}

export interface FooterData {
  email: string;
  text: string;
  location: string;
}
