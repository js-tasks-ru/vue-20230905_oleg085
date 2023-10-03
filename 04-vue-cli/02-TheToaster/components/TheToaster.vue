<template>
  <div class="toasts">
    <UiToast v-for="toast in toastList" :variant="toast.type" :key="toast.key">
      {{ toast.message }}
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
  type: ToastType,
  key: number
}

export default defineComponent({
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toastList: [] as Array<ToastProps>
    }
  },

  methods: {
    success(message: string = '') {
      this.toastEmitter(message, ToastType.success)
    },

    error(message: string = '') {
      this.toastEmitter(message, ToastType.error)
    },

    toastEmitter(message: string, type: ToastType, timeout: number = 5000) {
      const key = Date.now() // can be uuid
      this.toastList.push({ message, type, key })

      setTimeout(() => {
        const index = this.toastList.findIndex((toast) => toast.key === key)
        index !== -1 && this.toastList.splice(index, 1)
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
