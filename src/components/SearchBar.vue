<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits<{
  (e: 'search', query: string): void;
}>();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};
</script>

<template>
  <div class="w-full max-w-xl mx-auto mb-8">
    <div class="flex gap-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for videos..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        @keyup.enter="handleSearch"
      />
      <button
        @click="handleSearch"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </div>
  </div>
</template>