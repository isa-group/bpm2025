import {createApp, ref} from 'vue'
import App from './App.vue'
import router from './router';
import axios from "axios";
import VueGtag from "vue-gtag";

import { IonicVue } from '@ionic/vue';


/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import 'vue-ionicons/ionicons.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

/* Theme variables */
import './theme/variables.css';
import backend from "../backend.config";

function applyTheme() {
  // First, check if a theme is saved in localStorage
  const savedTheme = localStorage.getItem('theme');

  // If there's a saved theme, use it
  if (savedTheme) {
    document.body.classList.toggle('dark', savedTheme === 'dark');
  } else {
    // If no saved theme, use the system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark', prefersDark);
  }
}
// Apply the theme before mounting the app
applyTheme();



const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(VueGtag, {
        config: { id: "G-4ZSK67CV8L" }
    });


const isOffline = ref(false);
app.provide('isOffline', isOffline);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceW.js')
      .then(() => {
        console.log('ServiceWorker registration successful.');

        navigator.serviceWorker.onmessage = event => {
          if (event.data.type === 'OFFLINE') {
            isOffline.value = true; // Trigger the popup

          }
        };
      })
      .catch(err => console.log('ServiceWorker registration failed:', err));
}

app.config.globalProperties.axios = axios;



router.isReady().then(() => {
  app.mount('#app');
});

defineCustomElements(window);



// Code for automatically refreshing tokens if access to an endpoint is denied because of code 401
axios.interceptors.response.use(
    response => response, // If the response is successful, just return it.
    async error => {
      // If the response indicates that the token has expired
      if (error.response.status === 401) {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          // Attempt to get a new access token using the refresh token
          const refreshResponse = await axios.post(backend.construct( 'auth/refresh'), {
            token: refreshToken,
          });

          // Save the new tokens
          localStorage.setItem('accessToken', refreshResponse.data.accessToken);
          localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

          // Resend the failed request with the new access token
          const config = error.config;
          config.headers['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;

          // Return the result of the newly made request to continue the original request's flow
          return axios(config);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);

          // If token refresh also fails, redirect to login or handle accordingly
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          router.push('/auth/login');
          return Promise.reject(refreshError);
        }
      }

      // For any other type of errors, just pass them along
      return Promise.reject(error);
    }
);
