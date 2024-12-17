import axios from 'axios';
import type { AudioFormat } from '@/composables/useDownload';

const API_BASE_URL = 'http://localhost:3001'; // Update this with your actual API URL

export const downloadAudioFile = async (videoId: string, format: AudioFormat): Promise<void> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/download/${videoId}/${format}`, {
      responseType: 'blob'
    });

    // Create a blob URL and trigger download
    const blob = new Blob([response.data], { type: `audio/${format}` });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audio.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to download audio');
  }
};