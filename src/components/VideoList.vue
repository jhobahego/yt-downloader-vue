<script setup lang="ts">
import type { YouTubeSearchResult } from '../types/youtube';
import VideoItem from './VideoItem.vue';

defineProps<{
  videos: YouTubeSearchResult[];
  browser: string;
}>();
</script>

<template>
  <div class="w-full max-w-3xl mx-auto space-y-4">
    <VideoItem
      v-for="video in videos"
      :key="video.id.videoId"
      :video="video"
      :browser="browser"
    />
  </div>
</template>