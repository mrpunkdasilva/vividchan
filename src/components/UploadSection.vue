<script setup lang="ts">
import { ref } from 'vue';

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    handleFiles(files);
  }
};

const handleFiles = (files: FileList) => {
  console.log('Arquivos recebidos:', files);
  // Implementação do upload via Fetch nativo virá a seguir
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
        'border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300',
        isDragging ? 'border-neon-cyan bg-cyan-900/10' : 'border-neon-pink bg-pink-900/10'
      ]"
    >
      <input 
        type="file" 
        ref="fileInput" 
        class="hidden" 
        accept="image/*"
        @change="(e: any) => handleFiles(e.target.files)"
      />
      
      <div class="space-y-4">
        <h2 class="text-3xl font-bold neon-pink uppercase tracking-tighter">
          Upload Background
        </h2>
        <p class="text-gray-400">
          Drop your image here or <span class="text-neon-cyan underline">browse</span>
        </p>
        <div class="text-xs text-gray-500 uppercase tracking-widest">
          Recommended: 1920x1080 or larger
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Estilos específicos se necessário */
</style>
