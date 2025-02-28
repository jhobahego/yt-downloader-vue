import { ref } from 'vue';
import { downloadAudioFile } from '@/services/downloadService';
import { YouTubeSearchResult } from '@/types/youtube';

export type AudioFormat = 'mp3' | 'wav';

export function useDownload() {
  const downloading = ref(false);
  const error = ref<string | null>(null);

  const downloadAudio = async (
    { id: { videoId }, snippet }: YouTubeSearchResult,
    format: AudioFormat
  ) => {
    try {
      downloading.value = true;
      error.value = null;
      await downloadAudioFile({ id: { videoId }, snippet}, format);
    } catch (e: any) {
      error.value = e.message || 'Download failed';
      console.error('Download error:', e);
    } finally {
      downloading.value = false;
    }
  };

  return {
    downloading,
    error,
    downloadAudio
  };
}