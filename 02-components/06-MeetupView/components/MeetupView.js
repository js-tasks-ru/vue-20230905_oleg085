import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';

import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription'
import MeetupCover from '../../03-MeetupCover/components/MeetupCover'
import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo'
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda'

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <!-- meetup cover-->
      <meetup-cover :title="meetup.title" :image="meetup.image"></meetup-cover>
      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description :description="meetup.description"></meetup-description>
            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda v-if="meetup.agenda && meetup.agenda.length" :agenda="meetup.agenda"></meetup-agenda>
            <UiAlert v-else>Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date"></meetup-info>
          </div>
        </div>
      </UiContainer>
    </div>`,
});
