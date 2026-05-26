<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { BackgroundMock } from '../mocks/backgrounds';
import BackgroundCard from './BackgroundCard.vue';

const backgrounds = ref<BackgroundMock[]>([]);
const isLoading = ref(true);

const emit = defineEmits(['delete-success', 'preview', 'copy-link']);

const loadGallery = () => {
  const stored = localStorage.getItem('vividchan_uploads');
  if (stored) {
    backgrounds.value = JSON.parse(stored);
  } else {
    backgrounds.value = [];
  }
};

const deleteBackground = (id: string) => {
  const stored = localStorage.getItem('vividchan_uploads');
  if (stored) {
    const uploads = JSON.parse(stored);
    const updated = uploads.filter((bg: any) => bg.id !== id);
    localStorage.setItem('vividchan_uploads', JSON.stringify(updated));
    loadGallery();
    emit('delete-success');
  }
};

defineExpose({
  refresh: loadGallery
});

onMounted(() => {
  loadGallery();
  isLoading.value = false;
});
</script>

<template>
  <section class="mt-12">
    <h2 class="text-2xl font-bold neon-cyan uppercase mb-8 flex items-center gap-4">
      <span class="w-12 h-[2px] bg-neon-cyan"></span>
      Your Gallery // ギャラリー
    </h2>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="text-neon-pink font-mono animate-pulse tracking-widest uppercase">
        Initializing_Gallery...
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="backgrounds.length === 0" class="border border-gray-800 bg-gray-900/10 py-20 text-center group">
      <div class="space-y-4">
        <div class="text-gray-700 text-sm font-mono uppercase tracking-[0.5em] group-hover:neon-pink transition-colors">
          No_Data_Detected
        </div>
        <p class="text-gray-500 text-xs uppercase tracking-widest">
          Upload your first background to begin
        </p>
      </div>
    </div>

    <!-- Gallery Grid (Bento Irregular) -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(0,1fr)] gap-4">
      <BackgroundCard 
        v-for="(bg, index) in backgrounds" 
        :key="bg.id" 
        :background="bg"
        :index="index"
        @delete="deleteBackground"
        @preview="(url) => $emit('preview', url)"
        @copy-link="() => $emit('copy-link')"
      />
    </div>
  </section>
</template>
