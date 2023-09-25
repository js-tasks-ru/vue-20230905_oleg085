import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView'

export default defineComponent({
  name: 'PageMeetup',

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  data() {
    return {
      isLoading: false,
      errorMessage: null,
      meetup: null
    }
  },

  props: {
    meetupId: {
      type: Number,
      default: null
    }
  },

  watch: {
    meetupId: {
      async handler(id) {
        this.isLoading = true
        this.errorMessage = null
        this.meetup = null

        await fetchMeetupById(id)
          .then((response) => {
            this.meetup = response
          })
          .catch((error) => {
            this.errorMessage = error.message
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      immediate: true
    }
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <meetup-view v-if = "meetup" :meetup="meetup"></meetup-view>

      <UiContainer v-if="isLoading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else-if="errorMessage">
        <UiAlert>{{ errorMessage }}</UiAlert>
      </UiContainer>

    </div>`,
});
