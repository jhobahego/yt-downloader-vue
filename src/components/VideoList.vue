<script setup lang="ts">
import type { YouTubeSearchResult } from '@/types/youtube';
import VideoItem from './VideoItem.vue';

defineProps<{
  videos: YouTubeSearchResult[];
}>();
</script>

<template>
  <div class="space-y-4">
    <VideoItem
      v-for="video in videos"
      :key="video.id.videoId"
      :video="video"
    />
  </div>
</template>