<script setup lang="ts">
import { MOCK_BACKGROUNDS } from '../mocks/backgrounds';
import BackgroundCard from './BackgroundCard.vue';
</script>

<template>
  <section class="mt-12">
    <h2 class="text-2xl font-bold neon-cyan uppercase mb-8 flex items-center gap-4">
      <span class="w-12 h-[2px] bg-neon-cyan"></span>
      Background Repository // 倉庫
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(0,1fr)] gap-6">
      <BackgroundCard 
        v-for="bg in MOCK_BACKGROUNDS" 
        :key="bg.id" 
        :background="bg"
      />
    </div>
  </section>
</template>
