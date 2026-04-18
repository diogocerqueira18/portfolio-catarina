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
  show: boolean;
  icon: string;
  order: number;
  videoCount: number;
  videos?: Video[];
}