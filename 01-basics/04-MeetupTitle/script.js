import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const App = defineComponent({
  name: 'MeetupTitle',

  data() {
    return {
      meetupIdList: [1,2,3,4,5],
      checkedId: null,
      meetup: null
    }
  },

  watch: {
    async checkedId(id) {
      this.meetup = await fetchMeetupById(id)
    }
  }
})

createApp(App).mount('#app')
