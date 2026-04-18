import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { extractVideoId } from "../lib/extractVideoId";
import { Video } from "../types/portfolio";

export const useVideos = (sectionId: string | null) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sectionId) {
      setVideos([]);
      return;
    }

    setLoading(true);
    const videosRef = collection(db, "sections", sectionId, "videos");

    const unsubscribe = onSnapshot(videosRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];

      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setVideos(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sectionId]);

  const updateVideoCount = async (sectionId: string) => {
    try {
      const videosRef = collection(db, 'sections', sectionId, 'videos');
      const snapshot = await getDocs(videosRef);

      await updateDoc(doc(db, 'sections', sectionId), {
        videoCount: snapshot.size
      });
    } catch (error) {
      console.error("Erro ao atualizar videoCount:", error);
    }
  };

  const addVideo = async (videoData: Omit<Video, "id" | "videoId">) => {
    if (!sectionId) return;

    const videoId = extractVideoId(videoData.youtubeUrl);

    if (!videoId && videoData.youtubeUrl != "") {
      alert("URL do Youtube inválido");
      return;
    }

    await addDoc(collection(db, "sections", sectionId, "videos"), {
      ...videoData,
      videoId,
      order: videos.length + 1,
      createdAt: new Date(),
    });

    await updateVideoCount(sectionId);
  };

  const updateVideo = async (videoId: string, data: Partial<Video>) => {
  if (!sectionId) return;

  let updatedData = { ...data }

  if (data.youtubeUrl) {
    const newVideoId = extractVideoId(data.youtubeUrl);
    if (newVideoId) {
      updatedData.videoId = newVideoId
    }
  }

  try {
    await updateDoc(doc(db, 'sections', sectionId, 'videos', videoId), {
      ...updatedData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Erro ao atualizar vídeo:", error);
  }
};

  const deleteVideo = async (videoId: string) => {
    if (!sectionId) return;
    await deleteDoc(doc(db, 'sections', sectionId, 'videos', videoId));
    await updateVideoCount(sectionId);
  };

  return {
    videos,
    loading,
    addVideo,
    updateVideo,
    deleteVideo
  };
};
