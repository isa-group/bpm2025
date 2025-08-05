import { createApp } from 'vue';
import App from './App.vue';
import registerPlugins from '#/app';

const app = createApp(App);

registerPlugins(app);
app.mount(document.body);
