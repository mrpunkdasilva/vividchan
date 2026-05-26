<script setup lang="ts">
import { ref } from 'vue';
import { useCloudinary } from '../composables/useCloudinary';

const { uploadImage } = useCloudinary();

const emit = defineEmits(['upload-success']);

const isDragging = ref(false);
const isUploading = ref(false);
const uploadError = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    handleFiles(files);
  }
};

const handleFiles = async (files: FileList) => {
  const file = files[0];
  if (!file) return;

  // Segurança: Validação de Tipo e Tamanho (Máx 10MB)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    uploadError.value = 'Invalid file type. Only JPG, PNG, WEBP and GIF are allowed.';
    return;
  }

  if (file.size > maxSize) {
    uploadError.value = 'File is too large. Maximum size is 10MB.';
    return;
  }

  isUploading.value = true;
  uploadError.value = '';

  try {
    const result = await uploadImage(file);
    
    // Salvar no localStorage para persistência da galeria
    const stored = localStorage.getItem('vividchan_uploads');
    const uploads = stored ? JSON.parse(stored) : [];
    
    const newBackground = {
      id: result.public_id,
      url: result.secure_url,
      title: result.original_filename || 'Uploaded_Image',
      author: 'User_Upload',
      size: `${result.width}x${result.height}`,
      featured: false
    };
    
    uploads.unshift(newBackground);
    localStorage.setItem('vividchan_uploads', JSON.stringify(uploads));
    
    // Notificar a galeria
    emit('upload-success', newBackground);
    
  } catch (err: any) {
    uploadError.value = err.message || 'Falha ao enviar imagem.';
  } finally {
    isUploading.value = false;
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};
</script>

<template>
  <section class="p-8">
    <div 
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
      :class="[
        'border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden',
        isDragging ? 'border-neon-cyan bg-cyan-900/20' : 'border-neon-pink bg-pink-900/10',
        isUploading ? 'opacity-50 cursor-wait' : ''
      ]"
    >
      <input 
        type="file" 
        ref="fileInput" 
        class="hidden" 
        accept="image/*"
        :disabled="isUploading"
        @change="(e: any) => handleFiles(e.target.files)"
      />
      
      <!-- Uploading State -->
      <div v-if="isUploading" class="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
        <div class="flex flex-col items-center gap-2">
          <div class="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#00F0FF]"></div>
          <span class="text-neon-cyan font-mono text-xs uppercase tracking-[0.3em] animate-pulse">Uploading_Data...</span>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-3xl font-bold neon-pink uppercase tracking-tighter">
          {{ isUploading ? 'Processing...' : 'Upload Background' }}
        </h2>
        <p class="text-gray-400">
          Drop your image here or <span class="text-neon-cyan underline">browse</span>
        </p>
        
        <div v-if="uploadError" class="text-red-500 text-xs font-mono uppercase border border-red-900 bg-red-950/30 p-2 inline-block">
          Error: {{ uploadError }}
        </div>

        <div class="text-xs text-gray-500 uppercase tracking-widest font-mono">
          Max_File_Size: 10MB // JPG, PNG, WEBP, GIF
        </div>
      </div>
    </div>
  </section>
</template>
