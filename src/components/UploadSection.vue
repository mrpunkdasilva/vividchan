<script setup lang="ts">
import { ref } from 'vue';
import { useCloudinary } from '../composables/useCloudinary';
import { useImageOptimizer } from '../composables/useImageOptimizer';

const { uploadImage } = useCloudinary();
const { optimizeImage } = useImageOptimizer();

const emit = defineEmits(['upload-success', 'upload-error']);

interface QueueItem {
  id: string;
  name: string;
  status: 'pending' | 'optimizing' | 'uploading' | 'complete' | 'error';
  progress: number;
  error?: string;
  reduction?: string;
}

const isDragging = ref(false);
const uploadQueue = ref<QueueItem[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    processFiles(Array.from(files));
  }
};

const processFiles = async (files: File[]) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  for (const file of files) {
    const queueId = Math.random().toString(36).substring(7);
    
    // Validação Inicial
    if (!allowedTypes.includes(file.type)) {
      emit('upload-error', `Type not allowed: ${file.name}`);
      continue;
    }

    const item: QueueItem = {
      id: queueId,
      name: file.name,
      status: 'pending',
      progress: 0
    };
    uploadQueue.value.push(item);

    // Iniciar Processamento Assíncrono
    uploadItem(file, item);
  }
};

const uploadItem = async (file: File, item: QueueItem) => {
  try {
    // 1. Otimização
    item.status = 'optimizing';
    const optimized = await optimizeImage(file);
    item.reduction = optimized.reduction;

    // 2. Upload
    item.status = 'uploading';
    const result = await uploadImage(optimized.optimizedBlob, file.name);
    
    // 3. Persistência Local
    const stored = localStorage.getItem('vividchan_uploads');
    const uploads = stored ? JSON.parse(stored) : [];
    
    const newBackground = {
      id: result.public_id,
      url: result.secure_url,
      title: result.original_filename || item.name,
      author: 'User_Upload',
      size: `${result.width}x${result.height}`,
      featured: false
    };
    
    uploads.unshift(newBackground);
    localStorage.setItem('vividchan_uploads', JSON.stringify(uploads));
    
    item.status = 'complete';
    item.progress = 100;
    emit('upload-success', newBackground);

    // Remover da fila após 2 segundos se completo
    setTimeout(() => {
      uploadQueue.value = uploadQueue.value.filter(q => q.id !== item.id);
    }, 3000);

  } catch (err: any) {
    item.status = 'error';
    item.error = err.message || 'Error';
    emit('upload-error', `Failed: ${item.name}`);
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const clearQueue = () => {
  uploadQueue.value = [];
};
</script>

<template>
  <section class="p-8 space-y-6">
    <!-- Drop Zone -->
    <div 
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
      :class="[
        'border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group',
        isDragging ? 'border-neon-cyan bg-cyan-950/20' : 'border-neon-pink bg-pink-950/10'
      ]"
    >
      <input 
        type="file" 
        ref="fileInput" 
        class="hidden" 
        accept="image/*"
        multiple
        @change="(e: any) => processFiles(Array.from(e.target.files))"
      />
      
      <div class="space-y-4">
        <h2 class="text-3xl font-black neon-pink uppercase tracking-tighter italic group-hover:scale-105 transition-transform">
          Drop_Backgrounds
        </h2>
        <p class="text-gray-500 font-mono text-xs tracking-widest uppercase">
          Batch_Upload_Enabled // [Multi-Select_ON]
        </p>
        
        <div class="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-mono border border-gray-800 inline-block px-4 py-1">
          Max_Size: 10MB per file // Auto-Optimization_Active
        </div>
      </div>
    </div>

    <!-- Upload Queue Visualizer -->
    <div v-if="uploadQueue.length > 0" class="border border-gray-800 bg-black/40 backdrop-blur-md p-4 space-y-3 animate-in">
      <div class="flex justify-between items-center border-b border-gray-800 pb-2 mb-4">
        <span class="text-neon-cyan text-[10px] font-mono uppercase tracking-widest">Active_Transfers [{{ uploadQueue.length }}]</span>
        <button @click="clearQueue" class="text-[9px] text-gray-600 hover:text-red-500 uppercase font-mono cursor-pointer">Clear_Log</button>
      </div>

      <div v-for="item in uploadQueue" :key="item.id" class="flex flex-col gap-1">
        <div class="flex justify-between items-end text-[10px] font-mono">
          <span class="text-gray-400 truncate max-w-[200px]">{{ item.name }}</span>
          <span :class="{
            'text-neon-cyan animate-pulse': item.status === 'optimizing' || item.status === 'uploading',
            'text-green-500': item.status === 'complete',
            'text-red-500': item.status === 'error'
          }" class="uppercase tracking-tighter">
            {{ item.status }} {{ item.reduction ? `[${item.reduction}]` : '' }}
          </span>
        </div>
        <div class="w-full h-1 bg-gray-900 overflow-hidden">
          <div 
            class="h-full transition-all duration-500" 
            :class="{
              'bg-neon-cyan': item.status === 'optimizing' || item.status === 'uploading',
              'bg-green-500': item.status === 'complete',
              'bg-red-500': item.status === 'error'
            }"
            :style="{ width: item.status === 'complete' ? '100%' : (item.status === 'pending' ? '0%' : '50%') }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-in {
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
