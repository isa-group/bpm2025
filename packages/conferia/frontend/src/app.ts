import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import router from '#/plugins/router';
import { createPlugin as createAxiosPlugin } from '#/plugins/axios';

export default (app: App) => {
  const axiosPlugin = createAxiosPlugin();

  app
    .use(PrimeVue, { ripple: true, theme: { options: { darkModeSelector: '.dark' }} })
    .use(router)
    .use(axiosPlugin);
};
