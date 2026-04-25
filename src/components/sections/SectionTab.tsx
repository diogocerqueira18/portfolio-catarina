import {
  ArrowDown,
  ArrowUp,
  Edit2,
  Eye,
  EyeOff,
  Menu,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import { getIcon } from "../../lib/getIcon";
import { useSections } from "../../hooks/useSections";
import { useEffect, useState } from "react";
import { useVideos } from "../../hooks/useVideos";
import { iconOptions } from "../../lib/iconOptions";
import { EditSectionForm } from "../../types/portfolio";

type SectionTabProps = {
  editingSectionId: string | null;
  setEditingSectionId: React.Dispatch<React.SetStateAction<string | null>>;
  editSectionForm: EditSectionForm;
  setEditSectionForm: React.Dispatch<React.SetStateAction<EditSectionForm>>;
};

export const SectionTab = ({
  editingSectionId,
  setEditingSectionId,
  editSectionForm,
  setEditSectionForm,
}: SectionTabProps) => {
  const {
    sections,
    loading: sectionsLoading,
    addSection,
    updateSection,
    deleteSection,
  } = useSections();

  const { videos, addVideo, updateVideo, deleteVideo } =
    useVideos(editingSectionId);

  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editVideoForm, setEditVideoForm] = useState({
    title: "",
    youtubeUrl: "",
    type: "Cena",
  });

  // ==================== HANDLE BLUR PARA SECÇÕES ====================
  const handleSectionBlur = (
    field: "label" | "icon" | "navbarLabel",
    value: string,
  ) => {
    if (!editingSectionId || !value.trim()) return;

    updateSection(editingSectionId, { [field]: value });
  };

  // ==================== HANDLE BLUR PARA VÍDEOS ====================
  const handleVideoBlur = (
    videoId: string,
    field: "title" | "youtubeUrl" | "type",
    value: string,
  ) => {
    if (!videoId || !value.trim()) return;

    updateVideo(videoId, { [field]: value });
  };

  // ==================== FUNÇÕES DE EDIÇÃO ====================
  const startEditingSection = (section: any) => {
    setEditingSectionId(section.id);
    setEditSectionForm({
      label: section.label,
      icon: section.icon,
      navbarLabel: section.navbarLabel,
    });
  };

  const startEditingVideo = (video: any) => {
    setEditingVideoId(video.id);
    setEditVideoForm({
      title: video.title,
      youtubeUrl: video.youtubeUrl,
      type: video.type,
    });
  };

  const handleAddVideo = async () => {
    await addVideo({
      title: "Novo Vídeo",
      youtubeUrl: "",
      type: "Video",
    });
  };

  // ==================== FUNÇÕES DE ORDENAR ====================
  const moveSection = async (sectionId: string, direction: "up" | "down") => {
    const currentIndex = sections.findIndex((s) => s.id === sectionId);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const sectionA = sections[currentIndex];
    const sectionB = sections[targetIndex];

    const newOrderA = sectionB.order;
    const newOrderB = sectionA.order;

    await Promise.all([
      updateSection(sectionA.id!, { order: newOrderA }),
      updateSection(sectionB.id!, { order: newOrderB }),
    ]);
  };

  const moveVideo = async (videoId: string, direction: "up" | "down") => {
    const currentIndex = videos.findIndex((v) => v.id === videoId);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= videos.length) return;

    const videoA = videos[currentIndex];
    const videoB = videos[targetIndex];

    await Promise.all([
      updateVideo(videoA.id!, { order: videoB.order || targetIndex }),
      updateVideo(videoB.id!, { order: videoA.order || currentIndex }),
    ]);
  };

  if (sectionsLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        A carregar...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        const isFirst = index === 0;
        const isLast = index === sections.length - 1;
        const isEditing = editingSectionId === section.id;
        const IconComponent = getIcon(
          isEditing ? editSectionForm.icon : section.icon,
        );

        return (
          <div
            key={section.id}
            id={`section-${section.id}`}
            className="bg-white rounded-3xl p-8 border border-zinc-100"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1 pr-4 border-r border-zinc-100">
                  <button
                    disabled={isFirst}
                    onClick={() => moveSection(section.id!, "up")}
                    className="p-1 text-zinc-300 hover:text-brand disabled:opacity-20 transition-colors"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    disabled={isLast}
                    onClick={() => moveSection(section.id!, "down")}
                    className="p-1 text-zinc-300 hover:text-brand disabled:opacity-20 transition-colors"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-brand">
                  <IconComponent size={24} className="text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {isEditing ? editSectionForm.label : section.label}
                  </h3>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest">
                    {section.videoCount} Vídeos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    section.id &&
                    updateSection(section.id, {
                      showOnPage: !section.showOnPage,
                    })
                  }
                  className={`p-3 rounded-xl transition-colors ${section.showOnPage ? "bg-brand/10 text-brand" : "bg-zinc-100 text-zinc-400"}`}
                  title={
                    section.showOnPage
                      ? "Visível na Página"
                      : "Oculto na Página"
                  }
                >
                  {section.showOnPage ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
                <button
                  onClick={() =>
                    section.id &&
                    updateSection(section.id, {
                      showInNavbar: !section.showInNavbar,
                    })
                  }
                  className={`p-3 rounded-xl transition-colors ${!section.showOnPage ? "opacity-30 cursor-not-allowed bg-zinc-100 text-zinc-300" : section.showInNavbar ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-400"}`}
                  title={
                    section.showInNavbar
                      ? "Visível na Navbar"
                      : "Oculto na Navbar"
                  }
                >
                  <Menu size={20} />
                </button>
                <button
                  onClick={() =>
                    isEditing
                      ? setEditingSectionId(null)
                      : startEditingSection(section)
                  }
                  className="p-3 bg-zinc-100 text-zinc-600 rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => section.id && deleteSection(section.id)}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {editingSectionId === section.id && (
              <div className="border-t border-zinc-100 pt-8 space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                      Nome da Secção
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editSectionForm.label : section.label}
                      onChange={(e) => {
                        setEditSectionForm((prev) => ({
                          ...prev,
                          label: e.target.value,
                        }));
                      }}
                      onBlur={(e) => handleSectionBlur("label", e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                      Nome na Navbar
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setEditSectionForm((prev) => ({
                          ...prev,
                          navbarLabel: e.target.value,
                        }));
                      }}
                      onBlur={(e) =>
                        handleSectionBlur("navbarLabel", e.target.value)
                      }
                      value={editSectionForm.navbarLabel}
                      className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                      Ícone
                    </label>
                    <select
                      onChange={(e) => {
                        setEditSectionForm((prev) => ({
                          ...prev,
                          icon: e.target.value,
                        }));
                      }}
                      onBlur={(e) => handleSectionBlur("icon", e.target.value)}
                      value={editSectionForm.icon}
                      className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
                    >
                      {iconOptions.map((option) => {
                        return (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                      Vídeos
                    </h4>
                    <button
                      onClick={handleAddVideo}
                      className="text-[10px] uppercase tracking-widest font-bold text-brand flex items-center gap-1"
                    >
                      <Plus size={12} /> Adicionar Vídeo
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {videos.map((video, videoIndex) => {
                      const isFirstVideo = videoIndex === 0;
                      const isLastVideo = videoIndex === videos.length - 1;
                      const isEditingVideo = editingVideoId === video.id;
                      return (
                        <div
                          key={video.id}
                          className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col md:flex-row gap-4 items-end"
                        >
                          <div className="flex flex-col gap-1 pr-3 border-r border-zinc-200">
                            <button
                              disabled={isFirstVideo}
                              onClick={() => moveVideo(video.id!, "up")}
                              className="text-zinc-300 hover:text-brand disabled:opacity-20 transition-colors"
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              disabled={isLastVideo}
                              onClick={() => moveVideo(video.id!, "down")}
                              className="text-zinc-300 hover:text-brand disabled:opacity-20 transition-colors"
                            >
                              <ArrowDown size={16} />
                            </button>
                          </div>
                          <div className="w-full md:w-24 aspect-video rounded-xl overflow-hidden bg-zinc-200 border border-zinc-200">
                            {video.videoId ? (
                              <img
                                src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className=" w-full h-full flex items-center justify-center text-zinc-400">
                                <Video size={16} />
                              </div>
                            )}
                          </div>
                          <div className="grow grid md:grid-cols-3 gap-4 w-full">
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                                Título
                              </label>
                              <input
                                type="text"
                                value={
                                  isEditingVideo
                                    ? editVideoForm.title
                                    : video.title
                                }
                                onChange={(e) => {
                                  setEditVideoForm((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                  }));
                                }}
                                onFocus={() => startEditingVideo(video)}
                                onBlur={(e) =>
                                  handleVideoBlur(
                                    video.id!,
                                    "title",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-3 py-2 bg-white rounded-lg border border-zinc-100 text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                                Url YouTube
                              </label>
                              <input
                                type="text"
                                value={
                                  isEditingVideo
                                    ? editVideoForm.youtubeUrl
                                    : video.youtubeUrl
                                }
                                onChange={(e) => {
                                  setEditVideoForm((prev) => ({
                                    ...prev,
                                    youtubeUrl: e.target.value,
                                  }));
                                }}
                                onFocus={() => startEditingVideo(video)}
                                onBlur={(e) =>
                                  handleVideoBlur(
                                    video.id!,
                                    "youtubeUrl",
                                    e.target.value,
                                  )
                                }
                                placeholder="www.youtube.com/example"
                                className="w-full px-3 py-2 bg-white rounded-lg border border-zinc-100 text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                                Tipo
                              </label>
                              <input
                                type="text"
                                value={
                                  isEditingVideo
                                    ? editVideoForm.type
                                    : video.type
                                }
                                onChange={(e) => {
                                  setEditVideoForm((prev) => ({
                                    ...prev,
                                    type: e.target.value,
                                  }));
                                }}
                                onFocus={() => startEditingVideo(video)}
                                onBlur={(e) =>
                                  handleVideoBlur(
                                    video.id!,
                                    "type",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-3 py-2 bg-white rounded-lg border border-zinc-100 text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end pb-1">
                            <button
                              onClick={() => video.id && deleteVideo(video.id)}
                              className="p-2 text-red-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
