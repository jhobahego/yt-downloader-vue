import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

export function useYouTubeApiKey() {
  const apiKey = useLocalStorage('youtube-api-key', '');
  const showModal = ref(false);

  const setApiKey = (key: string, remember: boolean) => {
    if (remember) {
      apiKey.value = key;
    }
    return key;
  };

  const getApiKey = () => {
    return apiKey.value;
  };

  const clearApiKey = () => {
    apiKey.value = '';
  };

  return {
    apiKey,
    showModal,
    setApiKey,
    getApiKey,
    clearApiKey
  };
}