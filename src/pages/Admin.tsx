import {
  ArrowLeft,
  Edit2,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSections } from "../hooks/useSections";
import { getIcon } from "../lib/getIcon";
import { iconOptions } from "../lib/iconOptions";
import { useVideos } from "../hooks/useVideos";
import { preview } from "vite";
import { field } from "firebase/firestore/pipelines";

export const Admin = () => {
  const navigate = useNavigate();

  const {
    sections,
    loading: sectionsLoading,
    addSection,
    updateSection,
    deleteSection,
  } = useSections();

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editSectionForm, setEditSectionForm] = useState({
    label: "",
    icon: "",
  });

  const [selectedSectionForVideo, setSelectedSectionForVideo] = useState<
    string | null
  >(null);
  const { videos, addVideo, updateVideo, deleteVideo } =
    useVideos(editingSectionId);

  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editVideoForm, setEditVideoForm] = useState({
    title: "",
    youtubeUrl: "",
    type: "Cena",
  });

  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleLogout = () => {
    document.cookie = "isAdminLoggedIn=; max-age=0; path=/";
    document.cookie = "adminUser=; max-age=0; path=/";

    navigate("/login", { replace: true });
  };

  // ================= DEBOUNCE ===============
  const debouncedSave = useCallback(
    (type: "section" | "video", id: string, data: Partial<any>) => {
      if (saveTimeout) clearTimeout(saveTimeout);

      const timeout = setTimeout(async () => {
        if (type === "section" && id) {
          await updateSection(id, data);
        } else if (type === "video" && id) {
          await updateVideo(id, data);
        }
      }, 1300);

      setSaveTimeout(timeout);
    },
    [saveTimeout, updateSection, updateVideo],
  );

  // ================= Edicao Section ===============
  const startEditingSection = (section: any) => {
    setEditingSectionId(section.id);
    setEditSectionForm({
      label: section.label,
      icon: section.icon,
    });
  };

  const handleEditChange = (field: "label" | "icon", value: string) => {
    if (!editingSectionId) return;
    setEditSectionForm((prev) => ({ ...prev, [field]: value }));
    debouncedSave("section", editingSectionId, { [field]: value });
  };

  // ================= Edicao Video ===============
  const startEditingVideo = (video: any) => {
    setEditingVideoId(video.id);
    setEditVideoForm({
      title: video.title,
      youtubeUrl: video.youtubeUrl,
      type: video.type,
    });
  };
  const handleVideoChange = (
    videoId: string,
    field: "title" | "youtubeUrl" | "type",
    value: string,
  ) => {
    if (!editingVideoId) return;

    setEditVideoForm((prev) => ({ ...prev, [field]: value }))
    debouncedSave("video", editingVideoId, { [field]: value });
  };

  useEffect(() => {
    return () => {
      if (saveTimeout) clearTimeout(saveTimeout);
    };
  }, [saveTimeout]);

  const handleAddSection = async () => {
    const newSectionData = {
       label: "Nova Secção",
      show: false,
      icon: "camera",
      order: sections.length + 1,
      videoCount: 0,
    }
    
    const newId = await addSection(newSectionData);

    if (newId){
      setEditingSectionId(newId)
      setEditSectionForm({
        label: newSectionData.label,
        icon: newSectionData.icon
      })
    }
  };

  const handleAddVideo = async () => {
    await addVideo({
      title: "Novo Vídeo",
      youtubeUrl: "",
      type: "Video",
    });
  };

  if (sectionsLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        A carregar...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-brand transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-serif font-bold">Painel de Gestão</h1>
          </div>
          <button
            onClick={handleAddSection}
            className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform shadow-lg shadow-brand/20"
          >
            <Plus size={16} /> Adicionar Secção
          </button>
        </div>

        <div className="space-y-6">
          {sections.map((section) => {
            const isEditing = editingSectionId === section.id;
            const IconComponent = getIcon(
              isEditing ? editSectionForm.icon : section.icon,
            );

            return (
              <div
                key={section.id}
                className="bg-white rounded-3xl p-8 border border-zinc-100"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
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
                        updateSection(section.id, { show: !section.show })
                      }
                      className={`p-3 rounded-xl transition-colors ${section.show ? "bg-brand/10 text-brand" : "bg-zinc-100 text-zinc-400"}`}
                      title={
                        section.show ? "Visível na Navbar" : "Oculto na Navbar"
                      }
                    >
                      {section.show ? <Eye size={20} /> : <EyeOff size={20} />}
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
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                          Nome da Secção
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            handleEditChange("label", e.target.value)
                          }
                          value={editSectionForm.label}
                          className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                          Ícone
                        </label>
                        <div className="flex flex-row gap-3">
                          <select
                            onChange={(e) =>
                              handleEditChange("icon", e.target.value)
                            }
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
                          <div className="pointer-events-none">
                            {(() => {
                              const SelectedIcon = getIcon(
                                isEditing ? editSectionForm.icon : section.icon,
                              );
                              return (
                                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-brand">
                                  <SelectedIcon
                                    size={22}
                                    className="text-brand"
                                  />
                                </div>
                              );
                            })()}
                          </div>
                        </div>
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
                        {videos.map((video) => {
                          const isEditingVideo = editingVideoId === video.id;
                          return (
                            <div
                              key={video.id}
                              className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col md:flex-row gap-4 items-end"
                            >
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
                                    value={isEditingVideo ? editVideoForm.title : video.title}
                                    onFocus={() => startEditingVideo(video)}
                                    onChange={(e) =>
                                      handleVideoChange(
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
                                    value={isEditingVideo ? editVideoForm.youtubeUrl : video.youtubeUrl}
                                    onFocus={() => startEditingVideo(video)}
                                    onChange={(e) =>
                                      handleVideoChange(
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
                                    value={isEditingVideo ? editVideoForm.type : video.type}
                                    onFocus={() => startEditingVideo(video)}
                                    onChange={(e) =>
                                      handleVideoChange(
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
                                  onClick={() =>
                                    video.id && deleteVideo(video.id)
                                  }
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
      </div>
    </div>
  );
};
