import { Cloudinary } from "@cloudinary/url-gen";

export function useCloudinary() {
  // Nota: cloudName deve vir de uma variável de ambiente ou config
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'
    }
  });

  const getOptimizedImage = (publicId: string) => {
    return cld.image(publicId)
      .format('auto')
      .quality('auto');
  };

  return {
    cld,
    getOptimizedImage
  };
}
