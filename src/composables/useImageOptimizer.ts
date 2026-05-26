import { ref } from 'vue';
import imageCompression from 'browser-image-compression';

export interface OptimizationResult {
  file: File;
  optimizedBlob: Blob | File;
  originalSize: number;
  optimizedSize: number;
  reduction: string;
}

export function useImageOptimizer() {
  const isOptimizing = ref(false);

  const optimizeImage = async (file: File): Promise<OptimizationResult> => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 3840,
      useWebWorker: true,
      fileType: 'image/webp' as string,
      initialQuality: 0.85,
    };

    try {
      const optimizedFile = await imageCompression(file, options);
      const reduction = ((1 - optimizedFile.size / file.size) * 100).toFixed(2);

      return {
        file,
        optimizedBlob: optimizedFile,
        originalSize: file.size,
        optimizedSize: optimizedFile.size,
        reduction: reduction + '%'
      };
    } catch (error) {
      // Se a otimização falhar, retornamos o arquivo original como fallback
      return {
        file,
        optimizedBlob: file,
        originalSize: file.size,
        optimizedSize: file.size,
        reduction: '0%'
      };
    }
  };

  const optimizeBatch = async (files: File[]): Promise<OptimizationResult[]> => {
    isOptimizing.value = true;
    try {
      const promises = files.map(file => optimizeImage(file));
      return await Promise.all(promises);
    } finally {
      isOptimizing.value = false;
    }
  };

  return {
    isOptimizing,
    optimizeImage,
    optimizeBatch
  };
}
