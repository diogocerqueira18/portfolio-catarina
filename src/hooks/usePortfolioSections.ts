import { useEffect, useState } from "react";
import { Section, Video } from "../types/portfolio";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";

export const usePortfolioSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sectionsQuery = query(
      collection(db, "sections"),
      orderBy("order", "asc"),
    );

    const unsubscribeSections = onSnapshot(
      sectionsQuery,
      (sectionsSnapshot) => {
        let completed = 0;
        const total = sectionsSnapshot.docs.length;

        if (total === 0) {
          setSections([]);
          setLoading(false);
          return;
        }

        sectionsSnapshot.docs.forEach((sectionDoc) => {
          const sectionData = sectionDoc.data();
          const sectionId = sectionDoc.id;

          const videosQuery = query(
            collection(db, "sections", sectionId, "videos"),
            orderBy("order", "asc")
          );

          const unsubscribeVideos = onSnapshot(videosQuery, (videosSnapshot) => {
            const videos = videosSnapshot.docs.map((v) => ({
              id: v.id,
              ...v.data(),
            })) as Video[];

            const section: Section = {
              id: sectionId,
              label: sectionData.label,
              navbarLabel: sectionData.navbarLabel,
              showInNavbar: sectionData.showInNavbar,
              showOnPage: sectionData.showOnPage,
              icon: sectionData.icon,
              order: sectionData.order,
              videoCount: videos.length,
              videos: videos,
            };

            setSections((prev) => {
              const existing = prev.findIndex((s) => s.id === sectionId);
              if (existing !== -1) {
                const updated = [...prev];
                updated[existing] = section;
                return updated;
              } else {
                return [...prev, section];
              }
            });

            completed++;
            if (completed === total) setLoading(false);
          });
        });
      },
    );

    return () => unsubscribeSections();
  }, []);

  return { sections, loading };
};
