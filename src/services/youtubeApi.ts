import axios from 'axios';
import type { SearchResponse } from '@/types/youtube';
import { YOUTUBE_CONFIG } from '@/config/youtube';
import { YouTubeApiError } from '@/types/error';

const youtubeApi = axios.create({
  baseURL: YOUTUBE_CONFIG.BASE_URL,
  params: {
    key: YOUTUBE_CONFIG.API_KEY
  }
});

export const searchVideos = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await youtubeApi.get('/search', {
      params: {
        part: 'snippet',
        maxResults: YOUTUBE_CONFIG.MAX_RESULTS,
        q: query,
        type: 'video'
      }
    });
    return response.data;
  } catch (error: any) {
    const apiError = new YouTubeApiError(
      error.response?.data?.error?.message || 'Failed to search videos',
      {
        code: error.response?.data?.error?.code,
        status: error.response?.status,
        message: error.response?.data?.error?.message
      }
    );
    throw apiError;
  }
};