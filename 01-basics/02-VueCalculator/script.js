import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'CalcComponent',
  data() {
    return {
      aValue: undefined,
      bValue: undefined,
      operator: undefined
    }
  },

  computed: {
    result() {
      let result = 0

      if (this.aValue === undefined || this.bValue === undefined || !this.operator) { return result }

      switch (this.operator) {
        case "sum":
          result = this.aValue + this.bValue
          break;
        case "subtract":
          result = this.aValue - this.bValue
          break;
        case "multiply":
          result = this.aValue * this.bValue
          break;
        case "divide":
          // this place can return Infinity
          result = this.bValue !== 0 ? this.aValue / this.bValue : result
          break;
      }

      return result
    }
  }
})

createApp(App).mount('#app')
