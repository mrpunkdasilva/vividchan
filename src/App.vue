<script setup lang="ts">
import UploadSection from './components/UploadSection.vue';
import BackgroundGallery from './components/BackgroundGallery.vue';
import ThreeBackground from './components/ThreeBackground.vue';
</script>

<template>
  <div class="relative min-h-screen bg-[#0D0D0D] overflow-x-hidden">
    <!-- Three.js Background Layer -->
    <ThreeBackground />

    <main class="relative z-10 text-gray-300 font-sans p-4 md:p-8 max-w-7xl mx-auto">
      <!-- Header Anime Style -->
      <header class="mb-12 border-b border-gray-800 pb-6 flex justify-between items-end">
        <div>
          <h1 class="text-6xl font-black tracking-tighter neon-pink uppercase italic leading-none">
            VividChan
          </h1>
          <p class="text-[10px] tracking-[0.4em] uppercase text-gray-500 mt-2 font-mono">
            高品質背景画像 // High Quality Backgrounds
          </p>
        </div>
        <div class="hidden md:flex flex-col items-end gap-1">
          <span class="text-neon-cyan text-[10px] font-mono uppercase tracking-widest">
            System_Status: Online
          </span>
          <span class="text-gray-600 text-[9px] font-mono uppercase tracking-widest">
            Version 1.0.0_beta
          </span>
        </div>
      </header>

      <!-- Upload Section -->
      <UploadSection />

      <!-- Gallery Section (Mocked) -->
      <BackgroundGallery />

      <!-- Footer Decor -->
      <footer class="mt-24 pt-8 border-t border-gray-800 text-center flex flex-col items-center gap-4">
        <div class="flex gap-8">
          <span class="text-[9px] text-gray-700 uppercase tracking-[0.3em]">Protocol_77</span>
          <span class="text-[9px] text-gray-700 uppercase tracking-[0.3em]">Auth_Null</span>
          <span class="text-[9px] text-gray-700 uppercase tracking-[0.3em]">Enc_None</span>
        </div>
        <p class="text-[10px] text-gray-600 uppercase tracking-[0.5em]">
          VividChan // Aesthetic Background Repository
        </p>
      </footer>
    </main>
  </div>
</template>

<style>
/* Reset global e utilitários adicionais se necessário */
</style>
