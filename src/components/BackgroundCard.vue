<script setup lang="ts">
import type { BackgroundMock } from '../mocks/backgrounds';

defineProps<{
  background: BackgroundMock;
}>();
</script>

<template>
  <div 
    :class="[
      'group relative overflow-hidden border border-gray-800 transition-all duration-500 hover:z-10 animate-in',
      background.featured ? 'md:col-span-2 md:row-span-2 h-full' : 'h-64'
    ]"
  >
    <!-- Background Image -->
    <img 
      :src="background.url" 
      :alt="background.title"
      class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
    />

    <!-- Overlay Gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

    <!-- Content -->
    <div class="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      <div class="flex flex-col gap-1 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
        <span class="text-[10px] uppercase tracking-[0.3em] text-neon-cyan font-mono font-bold">
          {{ background.size }} // {{ background.author }}
        </span>
        <h3 class="text-2xl font-black text-white uppercase tracking-tighter group-hover:neon-pink transition-colors leading-tight">
          {{ background.title }}
        </h3>
      </div>
      
      <!-- Action Buttons (Visible on Hover) -->
      <div class="mt-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        <button class="px-6 py-2 text-[11px] uppercase font-black border-2 border-neon-pink text-white hover:bg-neon-pink hover:shadow-[0_0_15px_#FF007A] transition-all cursor-pointer bg-black/40">
          View Full
        </button>
        <button class="px-6 py-2 text-[11px] uppercase font-black border-2 border-neon-cyan text-white hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_#00F0FF] transition-all cursor-pointer bg-black/40">
          Download
        </button>
      </div>
    </div>

    <!-- Decorative Corner -->
    <div class="absolute top-0 right-0 w-8 h-8 border-t border-r border-gray-700 opacity-50 group-hover:border-neon-cyan group-hover:opacity-100 transition-all"></div>
  </div>
</template>

<style scoped>
/* Efeito de glitch sutil no título pode ser adicionado aqui futuramente */
</style>
{
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
