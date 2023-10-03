<template>
  <div :class="['toast', `toast_${variant}`]">
    <UiIcon class="toast__icon" :icon="IconType[variant]"/>
    <slot/>
  </div>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import type { PropType } from 'vue';

type ToastType = 'success' | 'error'

enum IconType {
  success = 'check-circle',
  error = 'alert-circle'
}

export default {
  name: 'UiToast',

  components: { UiIcon },

  data() {
    return {
      IconType
    }
  },

  props: {
    variant: {
      type: String as PropType<ToastType>,
      default: 'success',
      required: true
    }
  }

};
</script>

<style scoped>

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
