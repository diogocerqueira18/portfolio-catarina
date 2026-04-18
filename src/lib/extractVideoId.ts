export const extractVideoId = (url: string): string => {
  if (!url || typeof url !== 'string') return '';
  console.log(url)
  const cleanUrl = url.trim();

  // 1. Tenta capturar o parâmetro ?v= (o mais comum)
  const vParamMatch = cleanUrl.match(/[?&]v=([^#\&?]+)/);
  if (vParamMatch && vParamMatch[1]) {
    const id = vParamMatch[1];
    if (id.length === 11) return id;
  }

  // 2. Formato youtu.be/VIDEO_ID
  const youtuBeMatch = cleanUrl.match(/youtu\.be\/([^#\&?]+)/);
  if (youtuBeMatch && youtuBeMatch[1]) {
    const id = youtuBeMatch[1];
    if (id.length === 11) return id;
  }

  // 3. Formato embed/
  const embedMatch = cleanUrl.match(/embed\/([^#\&?]+)/);
  if (embedMatch && embedMatch[1]) {
    const id = embedMatch[1];
    if (id.length === 11) return id;
  }

  // 4. Formato /v/ ou /shorts/
  const shortMatch = cleanUrl.match(/(?:\/v\/|shorts\/)([^#\&?]+)/);
  if (shortMatch && shortMatch[1]) {
    const id = shortMatch[1];
    if (id.length === 11) return id;
  }

  // 5. Último fallback: qualquer sequência de 11 caracteres alfanuméricos
  const fallbackMatch = cleanUrl.match(/[a-zA-Z0-9_-]{11}/);
  if (fallbackMatch) {
    return fallbackMatch[0];
  }

  return '';
};