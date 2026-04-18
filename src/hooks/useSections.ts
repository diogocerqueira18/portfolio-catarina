import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Section } from "../types/portfolio";

const sectionsCollection = collection(db, 'sections')

export const useSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(sectionsCollection, orderBy('order', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Section[];

      setSections(data);
      setLoading(false);
    })

    return () => unsubscribe();
  }, []);

  const addSection = async (newSection: Omit<Section, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'sections'), {
        ...newSection,
      });
      return docRef.id;
    } catch (error) {
      console.error("Erro ao adicionar secção:", error);
    }
  };

  const updateSection = async (sectionId: string, data: Partial<Section>) => {
    try {
      await updateDoc(doc(db, 'sections', sectionId), data);
    } catch (error) {
      console.error("Erro ao atualizar secção:", error);
    }
  };

  const deleteSection = async (sectionId: string) => {
    try {
      await deleteDoc(doc(db, 'sections', sectionId));
    } catch (error) {
      console.error("Erro ao eliminar secção:", error);
    }
  };

  return {
    sections,
    loading,
    addSection,
    updateSection,
    deleteSection
  };
}