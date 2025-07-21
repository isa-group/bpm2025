/// <reference types="vite/client" />
import 'vue';
import type { Ref } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $fetchFailed: Ref<boolean>;
  }
}
