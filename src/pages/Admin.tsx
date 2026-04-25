import { ArrowLeft, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { TabSwitch } from "../components/ui/TabSwitch";
import { SectionTab } from "../components/sections/SectionTab";
import { GeneralTab } from "../components/sections/GeneralTab";
import { useNavigate } from "react-router-dom";
import { useSections } from "../hooks/useSections";
import { EditSectionForm } from "../types/portfolio";

export const Admin = () => {
  const navigate = useNavigate();

  const { addSection, sections } = useSections();
  const [activeTab, setActiveTab] = useState<string>("sections");
  // const [activeTab, setActiveTab] = useState<string>("general");

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editSectionForm, setEditSectionForm] = useState<EditSectionForm>({
    label: "",
    icon: "",
    navbarLabel: "",
  });

  const tabOptions = [
    { value: "general", label: "Geral" },
    { value: "sections", label: "Secções" },
  ];

  const handleLogout = () => {
    document.cookie = "isAdminLoggedIn=; max-age=0; path=/";
    document.cookie = "adminUser=; max-age=0; path=/";

    navigate("/login", { replace: true });
  };

  const handleAddSection = async () => {
    const newSectionData = {
      label: "Nova Secção",
      navbarLabel: "Nova Secção",
      showInNavbar: false,
      showOnPage: false,
      icon: "camera",
      order: sections.length + 1,
      videoCount: 0,
    };

    const newId = await addSection(newSectionData);
    console.log("novo", newId);
    if (newId) {
      setEditingSectionId(newId);
      setEditSectionForm({
        label: newSectionData.label,
        icon: newSectionData.icon,
        navbarLabel: newSectionData.navbarLabel,
      });

      setTimeout(() => {
        const element = document.getElementById(`section-${newId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          element.classList.add("ring-2", "ring-brand", "ring-offset-4");
          setTimeout(() => {
            element.classList.remove("ring-2", "ring-brand", "ring-offset-4");
          }, 2500);
        }
      }, 150);
    }
  };
  
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
          <div>
            <TabSwitch
              options={tabOptions}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>
          {activeTab == "sections" && (
            <button
              onClick={handleAddSection}
              className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform shadow-lg shadow-brand/20"
            >
              <Plus size={16} /> Adicionar Secção
            </button>
          )}
        </div>

        {activeTab == "sections" && (
          <SectionTab
            editingSectionId={editingSectionId}
            setEditingSectionId={setEditingSectionId}
            editSectionForm={editSectionForm}
            setEditSectionForm={setEditSectionForm}
          />
        )}
        {activeTab == "general" && <GeneralTab />}
      </div>
    </div>
  );
};
