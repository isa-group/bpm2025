<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ name }}</ion-title>
      <div
          v-if="name != 'Home'"
          slot="start"
          id="logo" />

      <ion-buttons slot="end" v-if="name == 'Home'">
        <ion-menu-button>

        </ion-menu-button>
      </ion-buttons>
      <ion-buttons v-if="name == 'Gallery'" slot="end" id="click-trigger" class="gallery-dropdown">
        <ion-icon :icon="reload" style="font-size: 26px;margin-right: 14px;" @click="$emit('reloadPage')"></ion-icon>
        <ion-icon :icon="options" style="font-size: 26px;margin-right: 10px;" @click="$emit('openFilter',$event)"></ion-icon>
        <ion-icon :icon="ellipsisVertical" style="font-size: 26px;" @click="$emit('openActionSheet')"></ion-icon>
      </ion-buttons>
      <ion-buttons v-if="name == 'My Gallery'" slot="end" id="click-trigger" class="gallery-dropdown" >
        <ion-icon :icon="reload" style="font-size: 26px;margin-right: 10px;" @click="$emit('reloadPage')"></ion-icon>
        <ion-icon :icon="ellipsisVertical" style="font-size: 26px;" @click="$emit('openActionSheet')"></ion-icon>
      </ion-buttons>
      <ion-buttons v-if="name == 'Messages'" slot="end" id="click-trigger" class="gallery-dropdown" >
        <ion-icon :icon="reload" style="font-size: 26px;margin-right: 14px;" @click="$emit('reloadPage')"></ion-icon>
      </ion-buttons>
      <ion-buttons v-if="showReload" slot="end" id="click-trigger" class="gallery-dropdown" >
        <ion-icon :icon="reload" style="font-size: 26px;margin-right: 14px;" @click="$emit('reloadPage')"></ion-icon>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <SettingsMenu v-if="name == 'Home'" />
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/vue";
import SettingsMenu from "@/components/SettingsMenu.vue";
import {ellipsisVertical, reload, options} from 'ionicons/icons';

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