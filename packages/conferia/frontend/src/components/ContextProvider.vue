<template>
  <slot />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import axios from 'axios';
import { useLocalStorage, computedAsync } from '@vueuse/core';
import {
  accessTokenKey,
  userDetailsKey
} from '#/plugins/symbols';
import backend from '#/plugins/backend.config';

const accessToken = useLocalStorage<string | undefined>('accessToken', undefined);

provide(accessTokenKey, accessToken);
provide(userDetailsKey, computedAsync(async () => {
  if (accessToken.value) {
    return (await axios.get(
      backend.construct('account/userDetails'),
      { headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
      }
    )).data;
  }
}, undefined));
</script>
