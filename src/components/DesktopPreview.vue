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
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
      <!-- Backdrop -->
      <div @click="close" class="absolute inset-0 bg-black/95 backdrop-blur-sm"></div>

      <!-- Desktop Container -->
      <div class="relative w-full max-w-6xl aspect-video bg-[#1A1B26] border-8 border-[#2E303E] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-lg animate-in">
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
</style>
