import { Cloudinary } from "@cloudinary/url-gen";

export function useCloudinary() {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName
    }
  });

  const getOptimizedImage = (publicId: string) => {
    return cld.image(publicId)
      .format('auto')
      .quality('auto');
  };

  const uploadImage = async (file: File | Blob, originalName?: string) => {
    if (!uploadPreset) {
      throw new Error('Upload preset is missing. Please check your .env.local file.');
    }

    const formData = new FormData();
    formData.append('file', file);
    if (originalName) {
      formData.append('public_id', originalName.split('.')[0] + '_' + Date.now());
    }
    formData.append('upload_preset', uploadPreset);
    formData.append('tags', 'vividchan_gallery');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    return await response.json();
  };

  const fetchImagesByTag = async (tag: string = 'vividchan_gallery') => {
    // Nota: A List API do Cloudinary requer uma API Key/Secret e não deve ser chamada diretamente no client-side
    // em um app de produção real por segurança. Mas para este projeto sem backend, usaremos a URL de JSON da tag
    // se o seu Cloudinary permitir acesso de leitura pública (configuração comum para galerias simples).
    try {
      const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`);
      if (!response.ok) throw new Error('Failed to fetch gallery');
      const data = await response.json();
      
      return data.resources.map((res: any) => ({
        id: res.public_id,
        url: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${res.public_id}.${res.format}`,
        title: res.public_id,
        author: 'User_Upload',
        size: `${res.width}x${res.height}`,
        featured: false // Poderíamos definir lógica para featured aqui
      }));
    } catch (error) {
      return null;
    }
  };

  return {
    cld,
    getOptimizedImage,
    uploadImage,
    fetchImagesByTag
  };
}
