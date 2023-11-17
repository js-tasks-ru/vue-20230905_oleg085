<template>
  <button @click="localCount++">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localCount: 0
    }
  },
  watch: {
    count: {
      handler(count) {
        this.localCount = count
      },
      immediate: true
    },
    localCount(count) {
      this.$emit('update:count', count)
    }
  },
  emits: ['update:count']
};
</script>
