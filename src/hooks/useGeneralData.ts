import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { GeneralData } from "../types/portfolio";
import { db } from "../config/firebase";

const GENERAL_DOC_ID = "general";
const STORAGE_FOLDER = "hero-images";

export const useGeneralData = () => {
  const [data, setData] = useState<GeneralData>({
    name: "",
    title: "",
    bio: "",
    info: { altura: "", cabelo: "", olhos: "" },
    heroImages: [{ src: "" }, { src: "" }, { src: "" }],
    footer: {email: "", text: "", location: "",}
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<number | null>(null); // índice da imagem que está a fazer upload

  const storage = getStorage();

  useEffect(() => {
    const generalRef = doc(db, "general", GENERAL_DOC_ID);

    const unsubscribe = onSnapshot(generalRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as GeneralData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Upload de imagem + apagar a anterior
  const uploadHeroImage = async (index: number, file: File) => {
    if (!file) return;

    setUploading(index);

    try {
      const oldUrl = data.heroImages[index]?.src;

      // 1. Apagar imagem antiga (se existir)
      if (oldUrl && oldUrl.includes("firebasestorage.googleapis.com")) {
        try {
          const oldRef = ref(storage, oldUrl);
          await deleteObject(oldRef);
          console.log(`Imagem antiga apagada: ${oldUrl}`);
        } catch (e) {
          console.log(
            "Não foi possível apagar imagem antiga (pode já não existir)",
          );
        }
      }

      // 2. Fazer upload da nova imagem
      const fileName = `hero-${index}.jpg`;
      const storageRef = ref(storage, `${STORAGE_FOLDER}/${fileName}`);

      console.log(fileName)
      await uploadBytes(storageRef, file);
      const newUrl = await getDownloadURL(storageRef);

      // 3. Atualizar no Firestore
      const newImages = [...data.heroImages];
      newImages[index] = { src: newUrl };

      await updateDoc(doc(db, "general", GENERAL_DOC_ID), {
        heroImages: newImages,
      });
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      alert("Erro ao fazer upload da imagem");
    } finally {
      setUploading(null);
    }
  };

  const updateGeneral = async (newData: Partial<GeneralData>) => {
    try {
      const generalRef = doc(db, "general", GENERAL_DOC_ID);
      await updateDoc(generalRef, newData);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  return {
    data,
    updateGeneral,
    uploadHeroImage,
    uploading,
    loading,
  };
};
