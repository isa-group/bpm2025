import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import router from '#/plugins/router';
import { createPlugin as createAxiosPlugin } from '#/plugins/axios';

export default (app: App) => {
  const axiosPlugin = createAxiosPlugin();

  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities'
        }
      }
    }
  })
    .use(ToastService)
    .use(router)
    .use(axiosPlugin);
};
