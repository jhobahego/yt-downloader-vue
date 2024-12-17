import { ref } from 'vue';
import type { Ref } from 'vue';
import { searchVideos } from '@/services/youtubeApi';
import type { YouTubeSearchResult } from '@/types/youtube';
import type { ApiError } from '@/types/error';

export function useYouTubeSearch() {
  const videos: Ref<YouTubeSearchResult[]> = ref([]);
  const loading = ref(false);
  const error = ref<ApiError | null>(null);

  const search = async (query: string) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await searchVideos(query);
      videos.value = response.items;
    } catch (e: any) {
      error.value = {
        message: e.message || 'An error occurred while searching for videos',
        code: e.details?.code,
        status: e.details?.status
      };
    } finally {
      loading.value = false;
    }
  };

  return {
    videos,
    loading,
    error,
    search
  };
}