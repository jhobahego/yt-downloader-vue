<script setup lang="ts">
import { computed } from 'vue';
import type { YouTubeSearchResult } from '@/types/youtube';
import { useDownload } from '@/composables/useDownload';

const props = defineProps<{
  video: YouTubeSearchResult;
}>();

const { downloading, error, downloadAudio } = useDownload();

const truncatedDescription = computed(() => {
  return props.video.snippet.description.length > 100
    ? `${props.video.snippet.description.slice(0, 100)}...`
    : props.video.snippet.description;
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4">
    <img
      :src="video.snippet.thumbnails.default.url"
      :alt="video.snippet.title"
      class="w-full md:w-32 h-24 object-cover rounded"
    />
    <div class="flex-1">
      <h3 class="text-lg font-semibold mb-2">{{ video.snippet.title }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ video.snippet.channelTitle }}</p>
      <p class="text-sm text-gray-500 mb-4">{{ truncatedDescription }}</p>
      
      <div v-if="error" class="text-red-500 text-sm mb-2">
        {{ error }}
      </div>
      
      <div class="flex gap-2">
        <button
          @click="downloadAudio(video, 'mp3')"
          :disabled="downloading"
          class="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ downloading ? 'Downloading...' : 'Download MP3' }}
        </button>
        <button
          @click="downloadAudio(video, 'wav')"
          :disabled="downloading"
          class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ downloading ? 'Downloading...' : 'Download WAV' }}
        </button>
      </div>
    </div>
  </div>
</template>