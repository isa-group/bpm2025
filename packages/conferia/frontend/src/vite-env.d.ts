import type { Ref } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $fetchFailed: Ref<boolean>;
  }
}
