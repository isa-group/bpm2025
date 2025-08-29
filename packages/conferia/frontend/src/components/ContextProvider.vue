<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, watchSyncEffect, watch } from 'vue';
import axios from 'axios';
import { useLocalStorage, computedAsync } from '@vueuse/core';
import { useRouter } from 'vue-router';
import {
  accessTokenKey,
  refreshTokenKey,
  userIdKey,
  axiosKey,
  userDetailsKey
} from '#/plugins/symbols';

const router = useRouter();
const accessToken = useLocalStorage<string | undefined>('accessToken', undefined);
const refreshToken = useLocalStorage<string | undefined>('refreshToken', undefined);
const userId = useLocalStorage<string | undefined>('userId', undefined);

/**
 * Axios instance creation
 */
const instance = axios.create();
instance.defaults.baseURL = 'https://conferia.bpm2025seville.org/api/v1/';
instance.defaults.headers.common['Content-Type'] = 'application/json';

// Code for automatically refreshing tokens if access to an endpoint is denied because of code 401
instance.interceptors.response.use(
  response => response, // If the response is successful, just return it.
  async (error) => {
    // If the response indicates that the token has expired
    if (error.response.status === 401) {
      try {
        // Attempt to get a new access token using the refresh token
        const refreshResponse = await instance.post('auth/refresh', {
          token: refreshToken.value
        });

        accessToken.value = refreshResponse.data.accessToken;
        refreshToken.value = refreshResponse.data.refreshToken;

        // Resend the failed request with the new access token
        const config = error.config;
        config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;

        // Return the result of the newly made request to continue the original request's flow
        return await instance(config);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);

        // If token refresh also fails, redirect to login or handle accordingly
        accessToken.value = undefined;
        refreshToken.value = undefined;
        void router.push('/auth/login');
        return Promise.reject(new Error('Token refresh failed'));
      }
    }

    // For any other type of errors, just pass them along
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

watchSyncEffect(() => {
  const token = accessToken.value;
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
});

watch([accessToken, refreshToken], (newVal) => {
  if (newVal.some(val => !val)) {
    // Forces middleware pipeline rerun
    void router.replace({
      ...router.currentRoute.value,
      force: true
    });
  }
}, {
  immediate: true,
  flush: 'sync'
});

provide(accessTokenKey, accessToken);
provide(refreshTokenKey, refreshToken);
provide(userIdKey, userId);
provide(axiosKey, instance);
provide(userDetailsKey, computedAsync(async () => {
  if (accessToken.value) {
    return (await instance.get('account/userDetails')).data;
  }
}, undefined));
</script>
