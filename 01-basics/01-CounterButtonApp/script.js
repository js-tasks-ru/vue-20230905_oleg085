import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'CounterButtonApp',
  data() {
    return {
      counter: 0
    }
  }
})

createApp(App).mount('#app')
