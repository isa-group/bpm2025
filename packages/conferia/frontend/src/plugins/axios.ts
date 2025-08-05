import axios from 'axios';
import type { App } from 'vue';
import router from '#/plugins/router';
import backend from '#/plugins/backend.config';

/**
 * Creates the Axios plugin instance for Vue application instances
 */
export function createPlugin(): {
  install: (app: App) => Promise<void>;
} {
  return {
    install: async (app: App): Promise<void> => {
      app.config.globalProperties.axios = axios;

      // Code for automatically refreshing tokens if access to an endpoint is denied because of code 401
      axios.interceptors.response.use(
        response => response, // If the response is successful, just return it.
        async (error) => {
          // If the response indicates that the token has expired
          if (error.response.status === 401) {
            try {
              const refreshToken = localStorage.getItem('refreshToken');
              // Attempt to get a new access token using the refresh token
              const refreshResponse = await axios.post(backend.construct('auth/refresh'), {
                token: refreshToken
              });

              // Save the new tokens
              localStorage.setItem('accessToken', refreshResponse.data.accessToken);
              localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

              // Resend the failed request with the new access token
              const config = error.config;
              config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;

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
    }
  };
}
