import type { App } from 'vue';
import { IonicVue } from '@ionic/vue';
import router from '#/plugins/router';
import { createPlugin as createAxiosPlugin } from '#/plugins/axios';

export default (app: App) => {
  const axiosPlugin = createAxiosPlugin();

  app.use(IonicVue)
    .use(router)
    .use(axiosPlugin);
};
