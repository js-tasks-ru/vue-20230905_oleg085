import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup.vue'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          meta: {
            saveScrollPosition: true
          },
          props: true,
          component: () => import('../views/PageMeetupDescription.vue'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          meta: {
            saveScrollPosition: true
          },
          props: true,
          component: () => import('../views/PageMeetupAgenda.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.meta?.saveScrollPosition && from.meta?.saveScrollPosition) {
      return {}
    }
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash }
    }
    return { top: 0, left: 0 }
  }
});
