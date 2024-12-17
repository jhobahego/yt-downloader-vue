<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const selectedBrowser = ref('chrome');

const emit = defineEmits<{
  (e: 'search', query: string): void;
  (e: 'browserSelected', browser: string): void;
}>();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};

const handleBrowserSelection = () => {
  emit('browserSelected', selectedBrowser.value);
};
</script>

<template>
  <div class="w-full max-w-xl mx-auto mb-8">
    <div class="flex flex-col gap-4">
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
      <div class="flex flex-col gap-2">
        <label for="browser-select" class="text-gray-700">
          Select your browser:
        </label>
        <select
          id="browser-select"
          v-model="selectedBrowser"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          @change="handleBrowserSelection"
          title="Select your browser to extract cookies and bypass YouTube's security"
        >
          <option value="brave">Brave</option>
          <option value="chrome">Chrome</option>
          <option value="firefox">Firefox</option>
          <option value="opera">Opera</option>
        </select>
        <p class="text-sm text-gray-500 italic">
          Hover over the dropdown to see why we ask for this information.
        </p>
      </div>
    </div>
  </div>
</template>
