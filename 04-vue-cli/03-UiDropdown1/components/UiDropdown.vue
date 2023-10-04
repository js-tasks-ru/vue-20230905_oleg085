<template>
  <div :class="['dropdown', { 'dropdown_opened': isOpened }]">
    <button type="button" :class="['dropdown__toggle', { 'dropdown__toggle_icon': hasIcon }]" @click="toggleMenu()">
      <UiIcon v-if="selected && selected.icon" :icon="selected.icon" class="dropdown__icon"/>
      <span>{{ !!selected ? selected.text : title }}</span>
    </button>

    <div v-show="isOpened" class="dropdown__menu" role="listbox">
      <UiDropdownItem
        v-for="({ value, text, icon }, index) in options"
        :class="{'dropdown__item_icon': hasIcon }"
        :icon="icon"
        :key="index"
        @click="closeMenu(); $emit('update:modelValue', value);"
      >
        {{ text }}
      </UiDropdownItem>
    </div>

    <select v-show="false" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="({ value, text }, index) in options" :value="value" :key="index">
        {{ text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import UiDropdownItem from './UiDropdownItem.vue';


interface Option {
  value: string
  text: string
  icon?: string
}


export default defineComponent({
  name: 'UiDropdown',

  components: { UiDropdownItem, UiIcon },

  props: {
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
      required: true
    },
    modelValue: {
      type: String
    },
    title: {
      type: String,
      default: '',
      required: true
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      isOpened: false
    }
  },

  computed: {
    hasIcon() {
      return this.options.some(({ icon }) => !!icon)
    },
    selected(): Option | undefined {
      return this.modelValue ? this.options.find(({ value }: Option) => value === this.modelValue) : undefined
    }
  },

  methods: {
    toggleMenu() {
      this.isOpened = !this.isOpened
    },

    closeMenu() {
      this.isOpened = false
    }
  },

  mounted() {
    // Simple click outside, this event need remove when component destroy
    document.addEventListener('click', event => {
      !this.$el.contains(event.target) && this.closeMenu()
    })
  }

});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__toggle {
  display: inline-block;
  background-color: var(--white);
  background-position: calc(100% - 10px) calc(100% - 10px);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 10px 56px 10px 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  transition-duration: 0.2s;
  transition-property: background-color, fill, color;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
}

.dropdown__toggle:after {
  content: '';
  position: absolute;
  top: 15px;
  right: 16px;
  transform: none;
  background: url('@/assets/icons/icon-chevron-down.svg') no-repeat;
  background-size: cover;
  display: block;
  width: 24px;
  height: 24px;
  transition: 0.2s transform;
}

.dropdown__toggle_icon {
  padding-left: 56px;
}

.dropdown_opened .dropdown__toggle {
  border-color: var(--blue);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown_opened .dropdown__toggle:after {
  transform: rotate(180deg);
}

.dropdown__menu {
  background-clip: padding-box;
  border-radius: 0 0 8px 8px;
  border: 2px solid var(--blue);
  border-top: none;
  bottom: auto;
  display: flex;
  flex-direction: column;
  left: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: auto;
  top: -1px;
  transform: translate3d(0px, 52px, 0px);
  width: 100%;
  will-change: transform;
  z-index: 95;
}

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
