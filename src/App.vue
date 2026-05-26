<script setup lang="ts">
import { ref } from 'vue';
import UploadSection from './components/UploadSection.vue';
import BackgroundGallery from './components/BackgroundGallery.vue';
import ThreeBackground from './components/ThreeBackground.vue';
import Toast from './components/Toast.vue';
import DesktopPreview from './components/DesktopPreview.vue';

const galleryRef = ref<InstanceType<typeof BackgroundGallery> | null>(null);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);

// Preview State
const isPreviewVisible = ref(false);
const previewUrl = ref('');

const handleUploadSuccess = () => {
  galleryRef.value?.refresh();
  toastRef.value?.addToast('Background uploaded successfully!');
};

const handleDeleteSuccess = () => {
  toastRef.value?.addToast('Background removed.', 'success');
};

const openPreview = (url: string) => {
  previewUrl.value = url;
  isPreviewVisible.value = true;
};

const handleCopyLink = () => {
  toastRef.value?.addToast('Link copied to clipboard!', 'success');
};

const handleUploadError = (message: string) => {
  toastRef.value?.addToast(message, 'error');
};
</script>

<template>
  <div class="relative min-h-screen bg-[#0D0D0D] overflow-x-hidden scanline-overlay">
    <!-- Three.js Background Layer -->
    <ThreeBackground />

    <main class="relative z-10 text-gray-300 font-sans p-4 md:p-8 max-w-7xl mx-auto">
      <!-- Header Anime Style -->
      <header class="mb-12 border-b border-gray-800 pb-6 flex justify-between items-end">
        <div class="group cursor-default">
          <h1 class="text-6xl font-black tracking-tighter neon-pink uppercase italic leading-none group-hover:glitch">
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
            Version 1.2.0_optimized
          </span>
        </div>
      </header>

      <!-- Upload Section -->
      <UploadSection @upload-success="handleUploadSuccess" @upload-error="handleUploadError" />

      <!-- Gallery Section -->
      <BackgroundGallery 
        ref="galleryRef" 
        @delete-success="handleDeleteSuccess" 
        @preview="openPreview"
        @copy-link="handleCopyLink"
      />

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

    <!-- Notification System -->
    <Toast ref="toastRef" />

    <!-- Desktop Preview Modal -->
    <DesktopPreview 
      :imageUrl="previewUrl" 
      :isVisible="isPreviewVisible" 
      @close="isPreviewVisible = false"
    />
  </div>
</template>

<style>
.scanline-overlay::before {
  content: " ";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  z-index: 100;
  background-size: 100% 4px, 3px 100%;
  pointer-events: none;
  opacity: 0.3;
}

.glitch {
  animation: glitch 1s linear infinite;
}

@keyframes glitch {
  2%, 64% { transform: translate(2px, 0) skew(0deg); }
  4%, 60% { transform: translate(-2px, 0) skew(0deg); }
  62% { transform: translate(0, 0) skew(5deg); }
}

.glitch:before,
.glitch:after {
  content: attr(data-text);
  position: absolute;
  left: 0;
}

.glitch:before {
  animation: glitchTop 1s linear infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

@keyframes glitchTop {
  2%, 64% { transform: translate(2px, -2px); }
  4%, 60% { transform: translate(-2px, 2px); }
  62% { transform: translate(13px, -1px) skew(-13deg); }
}

.glitch:after {
  animation: glitchBottom 1.5s linear infinite;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitchBottom {
  2%, 64% { transform: translate(-2px, 0); }
  4%, 60% { transform: translate(-2px, 0); }
  62% { transform: translate(-22px, 5px) skew(21deg); }
}
</style>
