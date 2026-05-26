<script setup lang="ts">
import { ref } from 'vue';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

const addToast = (message: string, type: 'success' | 'error' = 'success') => {
  const id = nextId++;
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    removeToast(id);
  }, 3000);
};

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter(t => t.id !== id);
};

defineExpose({ addToast });
</script>

<template>
  <div class="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        :class="[
          'px-6 py-3 border-l-4 font-mono text-xs uppercase tracking-widest flex items-center gap-3 backdrop-blur-md shadow-lg',
          toast.type === 'success' ? 'bg-green-950/40 border-green-500 text-green-400' : 'bg-red-950/40 border-red-500 text-red-400'
        ]"
      >
        <span v-if="toast.type === 'success'" class="text-lg">✓</span>
        <span v-else class="text-lg">✕</span>
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.toast-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
