<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  imageUrl: string;
  isVisible: boolean;
}>();

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

const customWidth = ref(1920);
const customHeight = ref(1080);

const downloadResized = async () => {
  try {
    // Remove otimizações automáticas e injeta redimensionamento do Cloudinary
    // Ex: .../upload/w_1920,h_1080,c_fill/...
    const baseUrl = props.imageUrl.replace('/f_auto,q_auto', '');
    const resizedUrl = baseUrl.replace('/upload/', `/upload/w_${customWidth.value},h_${customHeight.value},c_fill/`);
    
    const response = await fetch(resizedUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vividchan-custom-${customWidth.value}x${customHeight.value}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    window.open(props.imageUrl, '_blank');
  }
};
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
      <!-- Backdrop -->
      <div @click="close" class="absolute inset-0 bg-black/95 backdrop-blur-sm"></div>

      <!-- Desktop Container -->
      <div class="relative w-full max-w-6xl aspect-video bg-[#1A1B26] border-8 border-[#2E303E] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-lg animate-in flex flex-col">
        <!-- Background Simulado -->
        <img :src="imageUrl" class="absolute inset-0 w-full h-full object-cover opacity-80" />
        
        <!-- Desktop UI Mockup -->
        <div class="absolute inset-0 pointer-events-none">
          <!-- Icons -->
          <div class="p-8 grid grid-cols-1 gap-8 w-24">
            <div v-for="i in 4" :key="i" class="w-12 h-12 bg-white/10 border border-white/20 rounded-md backdrop-blur-md"></div>
          </div>
          
          <!-- Taskbar -->
          <div class="absolute bottom-0 w-full h-12 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center px-4 justify-between">
            <div class="flex gap-4 items-center">
              <div class="w-8 h-8 bg-neon-pink rounded-sm rotate-45"></div>
              <div class="w-24 h-4 bg-white/20 rounded-full"></div>
            </div>
            <div class="flex gap-4 text-[10px] font-mono text-gray-400">
              <span>23:59</span>
              <span>2026/05/25</span>
            </div>
          </div>
        </div>

        <!-- Resizer Tool Overlay -->
        <div class="absolute top-20 right-8 w-64 bg-black/80 backdrop-blur-xl border border-neon-cyan p-4 space-y-4 pointer-events-auto">
          <div class="text-neon-cyan text-[10px] uppercase tracking-widest font-mono mb-2">Resizer_Module</div>
          <div class="space-y-2">
            <div class="flex justify-between items-center text-[10px] uppercase text-gray-400">
              <span>Width</span>
              <input v-model="customWidth" type="number" class="w-20 bg-gray-900 border border-gray-700 text-white p-1 text-center outline-none focus:border-neon-pink" />
            </div>
            <div class="flex justify-between items-center text-[10px] uppercase text-gray-400">
              <span>Height</span>
              <input v-model="customHeight" type="number" class="w-20 bg-gray-900 border border-gray-700 text-white p-1 text-center outline-none focus:border-neon-pink" />
            </div>
          </div>
          <button 
            @click="downloadResized"
            class="w-full py-2 bg-neon-cyan text-black font-black text-[10px] uppercase tracking-tighter hover:bg-white transition-all cursor-pointer"
          >
            Download Custom Size
          </button>
          <div class="flex gap-2">
            <button @click="customWidth = 1920; customHeight = 1080" class="flex-1 py-1 bg-gray-800 text-gray-400 text-[8px] uppercase hover:text-white">1080p</button>
            <button @click="customWidth = 3840; customHeight = 2160" class="flex-1 py-1 bg-gray-800 text-gray-400 text-[8px] uppercase hover:text-white">4K</button>
            <button @click="customWidth = 1080; customHeight = 1920" class="flex-1 py-1 bg-gray-800 text-gray-400 text-[8px] uppercase hover:text-white">Mobile</button>
          </div>
        </div>

        <!-- Close Button -->
        <button 
          @click="close" 
          class="absolute top-4 right-4 z-50 w-10 h-10 bg-black/60 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white transition-all rounded-full flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        <div class="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 px-6 py-1 border border-neon-cyan text-neon-cyan text-[10px] uppercase tracking-[0.3em] font-mono">
          Desktop_Preview_Mode
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-in {
  animation: modalIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalIn {
  from { transform: scale(0.9) translateY(30px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
