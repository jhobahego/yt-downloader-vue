import { useYouTubeApiKey } from '@/composables/useYouTubeApiKey';

const { getApiKey } = useYouTubeApiKey();

export const YOUTUBE_CONFIG = {
  get API_KEY() {
    return getApiKey();
  },
  BASE_URL: 'https://www.googleapis.com/youtube/v3',
  MAX_RESULTS: 10,
} as const;