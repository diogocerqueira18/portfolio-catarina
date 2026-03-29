import { X } from "lucide-react";

type VideoModalProps = {
  videoId: string | null;
  onClose: () => void;
};
export const VideoModal = ({ videoId, onClose }: VideoModalProps) => {
  if (!videoId) return null;
  return (
    <div
      className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};
