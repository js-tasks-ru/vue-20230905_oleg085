import { defineComponent } from '../vendor/vue.esm-browser.js';
import {
  agendaItemDefaultTitles,
  agendaItemIcons
} from '../meetupService';

export default defineComponent({
  name: 'MeetupAgendaItem',

  data() {
    return {
      agendaItemDefaultTitles
    }
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        startsAt: null,
        endsAt: null,
        type: null,
        title: null,
        description: null,
        speaker: null,
        language: null
      })
    }
  },

  methods: {
    srcLocationGen(iconKey = 'key') {
      return '/assets/icons/icon-' + agendaItemIcons[iconKey] + '.svg'
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="srcLocationGen(agendaItem.type)" class="icon" :alt="agendaItem.type"/>
      </div>
      <div class="agenda-item__col">
        {{ agendaItem.startsAt + ' - ' + agendaItem.endsAt }}
      </div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">
          {{ agendaItem.title || agendaItemDefaultTitles[agendaItem.type] }}
        </h3>
        <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`
});
