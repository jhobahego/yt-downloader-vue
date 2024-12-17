<script setup lang="ts">
import { ref } from 'vue';
import { useYouTubeApiKey } from '@/composables/useYouTubeApiKey';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit'): void;
}>();

const { setApiKey } = useYouTubeApiKey();
const apiKeyInput = ref('');
const rememberKey = ref(true);

const handleSubmit = () => {
  if (apiKeyInput.value.trim()) {
    setApiKey(apiKeyInput.value.trim(), rememberKey.value);
    emit('submit');
    apiKeyInput.value = '';
  }
};

const handleClose = () => {
  apiKeyInput.value = '';
  emit('close');
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg max-w-md w-full p-6">
      <h2 class="text-xl font-semibold mb-4">YouTube API Key Required</h2>
      
      <div class="mb-6">
        <p class="text-gray-600 mb-4">
          To use this application, you need to provide a YouTube Data API key.
          You can get one by following these steps:
        </p>
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2">
          <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" class="text-blue-500 hover:underline">Google Cloud Console</a></li>
          <li>Create a new project or select an existing one</li>
          <li>Enable the YouTube Data API v3</li>
          <li>Create credentials (API key)</li>
          <li>Copy and paste your API key below</li>
        </ol>
      </div>
      
      <div class="mb-4">
        <label for="apiKey" class="block text-sm font-medium text-gray-700 mb-1">
          API Key
        </label>
        <input
          id="apiKey"
          v-model="apiKeyInput"
          type="text"
          placeholder="Enter your YouTube API key"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="handleSubmit"
        />
      </div>
      
      <div class="mb-6">
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="rememberKey"
            class="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span class="ml-2 text-sm text-gray-600">Remember this API key</span>
        </label>
      </div>
      
      <div class="flex justify-end gap-3">
        <button
          @click="handleClose"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>