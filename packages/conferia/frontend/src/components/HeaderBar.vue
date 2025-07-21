<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle>{{ name }}</IonTitle>
      <template #start>
        <div
          v-if="name != 'Home'"

          id="logo" />
      </template>

      <IonButtons
        v-if="name == 'Home'"
        slot="end">
        <IonMenuButton />
      </IonButtons>
      <IonButtons
        v-if="name == 'Gallery'"
        id="click-trigger"
        slot="end"
        class="gallery-dropdown">
        <IonIcon
          :icon="reload"
          style="font-size: 26px;margin-right: 14px;"
          @click="$emit('reloadPage')" />
        <IonIcon
          :icon="options"
          style="font-size: 26px;margin-right: 10px;"
          @click="$emit('openFilter',$event)" />
        <IonIcon
          :icon="ellipsisVertical"
          style="font-size: 26px;"
          @click="$emit('openActionSheet')" />
      </IonButtons>
      <IonButtons
        v-if="name == 'My Gallery'"
        id="click-trigger"
        slot="end"
        class="gallery-dropdown">
        <IonIcon
          :icon="reload"
          style="font-size: 26px;margin-right: 10px;"
          @click="$emit('reloadPage')" />
        <IonIcon
          :icon="ellipsisVertical"
          style="font-size: 26px;"
          @click="$emit('openActionSheet')" />
      </IonButtons>
      <IonButtons
        v-if="name == 'Messages'"
        id="click-trigger"
        slot="end"
        class="gallery-dropdown">
        <IonIcon
          :icon="reload"
          style="font-size: 26px;margin-right: 14px;"
          @click="$emit('reloadPage')" />
      </IonButtons>
      <IonButtons
        v-if="showReload"
        id="click-trigger"
        slot="end"
        class="gallery-dropdown">
        <IonIcon
          :icon="reload"
          style="font-size: 26px;margin-right: 14px;"
          @click="$emit('reloadPage')" />
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <SettingsMenu v-if="name == 'Home'" />
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/vue';
import { ellipsisVertical, reload, options } from 'ionicons/icons';
import SettingsMenu from '@/components/SettingsMenu.vue';

defineProps({
  name: String,
  showReload: Boolean
});

const emits = defineEmits(['openActionSheet', 'reloadPage', 'openFilter']);

</script>

<style scoped>
#logo {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 40px;
  width: 40px;
  margin-left: 8px;
  margin-top: 4px;
}
/* Light Mode */
body:not(.dark) #logo {
  background-image: url('@/assets/images/logo-1.svg');
}

/* Dark Mode */
body.dark #logo {
  background-image: url('@/assets/images/logo-2.svg');
}
.gallery-dropdown {
  margin-right: 15px;
  color: #3880ff
}

</style>
