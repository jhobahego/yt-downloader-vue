<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import VideoList from '@/components/VideoList.vue';
import ApiKeyModal from '@/components/ApiKeyModal.vue';
import { useYouTubeSearch } from '@/composables/useYouTubeSearch';
import { useYouTubeApiKey } from '@/composables/useYouTubeApiKey';

const { videos, loading, error, search } = useYouTubeSearch();
const { showModal, apiKey } = useYouTubeApiKey();
const browser = ref('')

const handleSearch = async (query: string) => {
  if (!apiKey.value) {
    showModal.value = true;
    return;
  }
  await search(query);
};

const handleSelectedBrowser = (selectedBrowser: string) => {
  browser.value = selectedBrowser;
};

const handleApiKeySubmit = async () => {
  showModal.value = false;
  // Retry the search if there are videos in the list
  if (videos.value.length > 0) {
    await search(videos.value[0].snippet.title);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">YouTube Video Downloader</h1>
      <SearchBar @search="handleSearch" @browser-selected="handleSelectedBrowser" />
      
      <div v-if="loading" class="text-center py-8">
        <p>Loading...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-8 text-red-500">
        {{ error.message }}
      </div>
      
      <VideoList v-else :videos="videos" :browser="browser" />
    </div>
    
    <ApiKeyModal
      :show="showModal"
      @close="showModal = false"
      @submit="handleApiKeySubmit"
    />
  </div>
</template>