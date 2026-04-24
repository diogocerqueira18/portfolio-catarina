import { ImageIcon, Images, Mail, User } from "lucide-react";
import { useGeneralData } from "../../hooks/useGeneralData";
import { use, useEffect, useState } from "react";

export const GeneralTab = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data, updateGeneral, uploadHeroImage, uploading, loading } =
    useGeneralData();
  const [form, setForm] = useState(data);

  useEffect(() => {
    if (!isEditing) {
      setForm(data);
    }
  }, [data, isEditing]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-brand">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border.brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  const handleBlur = (field: keyof typeof form) => {
    const newValue = form[field];
    const oldValue = data[field];

    setIsEditing(false);

    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      updateGeneral({ [field]: newValue });
    }
  };

  const handleInfoBlur = () => {
    if (JSON.stringify(form.info) !== JSON.stringify(data.info)) {
      updateGeneral({ info: form.info });
    }
  };

  const handleFooterBlur = () => {
    if (JSON.stringify(form.footer) !== JSON.stringify(data.footer)) {
      updateGeneral({ footer: form.footer });
    }
  };

  return (
    <div className="space-y-8">
      {/* PERSONAL INFO */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <User size={20} className="text-brand" /> Informação Pessoal
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Nome
            </label>
            <input
              type="text"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={() => setIsEditing(true)}
              onBlur={() => handleBlur("name")}
              className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Título Profissional
            </label>
            <input
              type="text"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              onFocus={() => setIsEditing(true)}
              onBlur={() => handleBlur("title")}
              className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
            Bio
          </label>
          <textarea
            value={form.bio || ""}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            onFocus={() => setIsEditing(true)}
            onBlur={() => handleBlur("bio")}
            className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30 h-32 resize-none"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Altura
            </label>
            <input
              type="text"
              value={form.info?.altura || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  info: { ...form.info, altura: e.target.value },
                })
              }
              onFocus={() => setIsEditing(true)}
              onBlur={handleInfoBlur}
              className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Cabelo
            </label>
            <input
              type="text"
              value={form.info?.cabelo || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  info: { ...form.info, cabelo: e.target.value },
                })
              }
              onFocus={() => setIsEditing(true)}
              onBlur={handleInfoBlur}
              className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Olhos
            </label>
            <input
              type="text"
              value={form.info?.olhos || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  info: { ...form.info, olhos: e.target.value },
                })
              }
              onFocus={() => setIsEditing(true)}
              onBlur={handleInfoBlur}
              className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Línguas (Separadas por vírgula)
            </label>
            <input
              type="text"
              value={(form.info?.linguas || []).join(", ")}
              onChange={(e) => {
                const newLangs = e.target.value
                  .split(",")
                  .map((lang) => lang.trim())
                  .filter((lang) => lang.length > 0);
                setForm((prev) => ({
                  ...prev,
                  info: { ...prev.info, linguas: newLangs },
                }));
              }}
              onFocus={() => setIsEditing(true)}
              onBlur={handleInfoBlur}
              className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Mail size={20} className="text-brand" /> Rodapé (Footer)
        </h3>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
            Texto do Footer
          </label>
          <textarea
            value={form.footer?.text || ""}
            onChange={(e) =>
              setForm({
                ...form,
                footer: { ...form.footer, text: e.target.value },
              })
            }
            onFocus={() => setIsEditing(true)}
            onBlur={handleFooterBlur}
            className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30 h-24 resize-none"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Email de Contacto
            </label>
            <input
              type="text"
              value={form.footer?.email || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  footer: { ...form.footer, email: e.target.value },
                })
              }
              onFocus={() => setIsEditing(true)}
              onBlur={handleFooterBlur}
              className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Localização
            </label>
            <input
              type="text"
              value={form.footer?.location || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  footer: { ...form.footer, location: e.target.value },
                })
              }
              onFocus={() => setIsEditing(true)}
              onBlur={handleFooterBlur}
              className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:outline-none focus:border-brand/30"
            />
          </div>
        </div>
      </div>

      {/* HERO IMAGES */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Images size={20} className="text-brand" /> Imagens de Perfil
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {data.heroImages.map((img, idx) => (
            <div key={idx} className="space-y-4">
              <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-100">
                {uploading == idx ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50">
                    <div className="w-8 h-8 border-4 border.brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  </div>
                ) : img.src ? (
                  <img
                    src={img.src}
                    alt={`Profile Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50">
                    <ImageIcon size={48} className="mb-2 opacity-50" />
                    <p className="text-xs">Sem imagem</p>
                  </div>
                )}
              </div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                Imagem {idx + 1}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadHeroImage(idx, file);
                }}
                className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-100 text-xs"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
