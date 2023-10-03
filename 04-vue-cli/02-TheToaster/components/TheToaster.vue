<template>
  <div class="toasts">
    <UiToast v-for="key in toastMap.keys()" :variant="toastMap.get(key).type" :key="key">
      {{ toastMap.get(key).message }}
    </UiToast>
  </div>
</template>

<script lang="ts">

import UiToast from './UiToast.vue';
import { defineComponent } from 'vue';

enum ToastType {
  success = 'success',
  error = 'error'
}

interface ToastProps {
  message: string,
  type: ToastType
}

export default defineComponent({
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toastMap: new Map() as Map<number, ToastProps>
    }
  },

  methods: {
    success(message: string = '') {
      this.toastEmitter(message, ToastType.success)
    },

    error(message: string = '') {
      this.toastEmitter(message, ToastType.error, 3000)
    },

    toastEmitter(message: string, type: ToastType, timeout: number = 5000) {
      const key = Date.now() // can be uuid
      this.toastMap.set(key, { message, type })

      setTimeout(() => {
        this.toastMap.delete(key)
      }, timeout)
    }
  }
});
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
