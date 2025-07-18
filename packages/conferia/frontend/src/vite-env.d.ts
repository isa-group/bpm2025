/// <reference types="vite/client" />
import 'vue';
import {Ref} from "vue";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $fetchFailed: Ref<boolean>;
    }
}