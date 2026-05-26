<script setup lang="ts">
import { ref } from 'vue';
import type { BackgroundMock } from '../mocks/backgrounds';
import { FEATURES } from '../config/features';

const props = defineProps<{
  background: BackgroundMock;
  index: number;
}>();

const emit = defineEmits(['delete', 'preview', 'copy-link']);

const viewFull = () => {
  window.open(props.background.url, '_blank');
};

const downloadImage = async () => {
  try {
    const highQualUrl = props.background.url.replace('/f_auto,q_auto', '');
    const response = await fetch(highQualUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vividchan-${props.background.id}.${props.background.url.split('.').pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    window.open(props.background.url, '_blank');
  }
};

const handleDelete = () => {
  if (confirm('Delete this background? // 削除しますか？')) {
    emit('delete', props.background.id);
  }
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.background.url);
    emit('copy-link');
  } catch (err) {
    // Silently fail
  }
};

// Efeito Parallax Mouse no Card
const cardRef = ref<HTMLElement | null>(null);
const tiltX = ref(0);
const tiltY = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return;
  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  tiltX.value = (x - centerX) / 15;
  tiltY.value = (y - centerY) / 15;
};

const resetTilt = () => {
  tiltX.value = 0;
  tiltY.value = 0;
};

// Lógica de Tamanho Irregular (Bento Grid)
const getSpanClass = () => {
  if (props.background.featured) return 'md:col-span-2 md:row-span-2 h-[500px]';
  
  const mod = props.index % 6;
  if (mod === 0) return 'md:col-span-2 md:row-span-1 h-64'; // Wide
  if (mod === 3) return 'md:col-span-1 md:row-span-2 h-[500px]'; // Tall
  return 'md:col-span-1 md:row-span-1 h-64'; // Normal
};
</script>

<template>
  <div 
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseleave="resetTilt"
    :class="[
      'group relative overflow-hidden border border-gray-800 transition-all duration-300 hover:z-10 animate-in float-animation',
      getSpanClass()
    ]"
    :style="{ 
      animationDelay: `${Math.random() * 2}s`,
      transform: `perspective(1000px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`
    }"
  >
    <!-- Background Image -->
    <img 
      :src="background.url" 
      :alt="background.title"
      class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
    />

    <!-- Quick Actions (Top Right) -->
    <div class="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
      <button 
        @click="copyLink"
        class="w-8 h-8 flex items-center justify-center bg-black/60 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all cursor-pointer"
        title="Copy Link"
      >
        🔗
      </button>
      <button 
        @click="$emit('preview', background.url)"
        class="w-8 h-8 flex items-center justify-center bg-black/60 border border-white text-white hover:bg-white hover:text-black transition-all cursor-pointer"
        title="Desktop Preview"
      >
        🖥️
      </button>
    </div>

    <!-- Delete Button (Top Left) -->
    <button 
      v-if="FEATURES.enableDelete"
      @click="handleDelete"
      class="absolute top-4 left-4 z-20 w-8 h-8 flex items-center justify-center bg-black/60 border border-red-500 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
      title="Delete"
    >
      ✕
    </button>

    <!-- Overlay Gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

    <!-- Content -->
    <div class="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
      <div class="flex flex-col gap-1 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
        <span class="text-[10px] uppercase tracking-[0.3em] text-neon-cyan font-mono font-bold">
          {{ background.size }} // {{ background.author }}
        </span>
        <h3 class="text-xl md:text-2xl font-black text-white uppercase tracking-tighter group-hover:neon-pink transition-colors leading-tight">
          {{ background.title }}
        </h3>
      </div>
      
      <!-- Action Buttons -->
      <div class="mt-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pointer-events-auto">
        <button 
          @click="viewFull"
          class="px-4 md:px-6 py-2 text-[10px] md:text-[11px] uppercase font-black border-2 border-neon-pink text-white hover:bg-neon-pink hover:shadow-[0_0_15px_#FF007A] transition-all cursor-pointer bg-black/40"
        >
          View
        </button>
        <button 
          @click="downloadImage"
          class="px-4 md:px-6 py-2 text-[10px] md:text-[11px] uppercase font-black border-2 border-neon-cyan text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_#FFF] transition-all cursor-pointer bg-black/40"
        >
          Get
        </button>
      </div>
    </div>

    <!-- Decorative Corner -->
    <div class="absolute top-0 right-0 w-8 h-8 border-t border-r border-gray-700 opacity-50 group-hover:border-neon-cyan group-hover:opacity-100 transition-all pointer-events-none"></div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: cardFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.group:hover {
  animation-play-state: paused;
}
</style>
