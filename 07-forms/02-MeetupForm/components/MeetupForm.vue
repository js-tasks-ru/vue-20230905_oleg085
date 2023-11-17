<template>
  <form class="meetup-form" @submit="$emit('submit', klona({ ...meetupLocal, agenda: agendaListLocal }))">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <UiFormGroup label="Название">
          <UiInput v-model="meetupLocal.title" name="title"/>
        </UiFormGroup>
        <UiFormGroup label="Дата">
          <UiInputDate v-model="meetupLocal.date" type="date" name="date"/>
        </UiFormGroup>
        <UiFormGroup label="Место">
          <UiInput v-model="meetupLocal.place" name="place"/>
        </UiFormGroup>
        <UiFormGroup label="Описание">
          <UiInput v-model="meetupLocal.description" multiline rows="3" name="description"/>
        </UiFormGroup>
        <UiFormGroup label="Изображение">
          <!--
               Предлагается сохранять файл для будущей загрузки во временное поле imageToUpload
               и передавать в объекте со всеми данными формы
          -->
          <UiImageUploader
            name="image"
            :preview="meetupLocal.image"
            @select="meetupLocal.imageToUpload = $event"
            @remove="meetupLocal.imageToUpload = null"
          />
        </UiFormGroup>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>
      <MeetupAgendaItemForm
        v-for="({ id }, index) in agendaListLocal"
        :key="id"
        :agenda-item="agendaListLocal[index]"
        class="meetup-form__agenda-item"
        @remove="agendaListLocal.splice(index, 1)"
        @update:agendaItem="agendaListLocal[index] = $event"
      />

      <div class="meetup-form__append">
        <button
          class="meetup-form__append-button"
          type="button"
          data-test="addAgendaItem"
          @click="addNewAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <UiButton
          variant="secondary"
          block
          class="meetup-form__aside-button"
          data-test="cancel"
          @click="$emit('cancel')">
          Отмена
        </UiButton>
        <UiButton
          variant="primary"
          block
          class="meetup-form__aside-button"
          data-test="submit"
          type="submit">
          {{ submitText }}
        </UiButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiImageUploader from './UiImageUploader.vue';
import UiInput from './UiInput.vue';
import UiInputDate from './UiInputDate.vue';
import { createAgendaItem } from '../meetupService.js';
import { reactive } from "vue";
import { klona } from "klona";

interface Meetup {
  id: number,
  title: string,
  description: string,
  place: string,
  date: Date,
  image: string,
  agenda: Array<AgendaItem>,
}

interface MeetupWithImage extends Meetup {
  imageToUpload?: string | null,
}

interface AgendaItem {
  id: number,
  startsAt: string,
  endsAt: string,
  type: string,
  title: string,
  description: string
}

const props = withDefaults(defineProps<{
  meetup: Meetup,
  submitText?: string
}>(), {
  submitText: '',
})

const meetupLocal = reactive<MeetupWithImage>({ ...props.meetup })
const agendaListLocal = reactive<AgendaItem[]>([...meetupLocal.agenda])

function addNewAgendaItem() {
  if (agendaListLocal.length) {
    const lastEndsAt = agendaListLocal[agendaListLocal.length - 1].endsAt
    agendaListLocal.push({ ...createAgendaItem() as AgendaItem, startsAt: lastEndsAt })
  } else {
    agendaListLocal.push({ ...createAgendaItem() as AgendaItem })
  }
}

</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
