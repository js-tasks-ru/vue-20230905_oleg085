<template>
  <button class="dropdown__item" role="option" type="button">
    <UiIcon v-if="!!icon" :icon="icon" class="dropdown__icon"/>
    <slot/>
  </button>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'UiDropdownItem',

  components: { UiIcon },

  props: {
    icon: {
      type: String
    }
  },

  data() {
    return {
      openState: false
    }
  }

});
</script>

<style scoped>

.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  text-decoration: none;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item_icon .dropdown__icon,
.dropdown__toggle_icon .dropdown__icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}
</style>
