<template>
  <ion-menu side="end" contentId="main-content" menuId="settings-menu">
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="ion-padding">
<!--        <img src="@/assets/images/icpm-logo-1.png" />-->
        <div id="logo-large" />
        <p>Welcome {{ name.firstname }} {{name.lastname}}</p>
      </div>
      <ion-list lines="full">
        <ion-item button :routerLink="'/profile/settings/'" @click="trackButtonClick('Profile page', 'Home', 'Navigation')">
          <ion-label>
            <ion-icon :icon="settingsOutline" slot="start" />
            Settings
          </ion-label>
        </ion-item>
        <ion-item button :routerLink="'/tabs/about/'" @click="trackButtonClick('About page', 'Home', 'Navigation')">
          <ion-label>
            <ion-icon :icon="informationCircleOutline" slot="start" />
            About the app
          </ion-label>
        </ion-item>
        <ion-item button @click="() => { trackButtonClick('Logout Button', 'Home', 'Feature'); logout(); }">
          <ion-label>
            <ion-icon :icon="logOutOutline" slot="start" />
            Logout
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {informationCircleOutline, logOutOutline, settingsOutline} from "ionicons/icons";
import {IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar} from "@ionic/vue";
import {useRouter} from 'vue-router';
import {onMounted, reactive} from "vue";
import axios from "axios";
import backend from "../../backend.config";
import {googleanalytics} from "@/composables/googleanalytics";

const { trackButtonClick } = googleanalytics();

const router = useRouter();
const name = reactive({
  firstname:"",
  lastname:""
});
const token = localStorage.getItem("accessToken")


onMounted(async () => {
  try {
    const response = await axios.get(backend.construct( 'account/getName'),{ headers: { Authorization: `Bearer ${token}` } });
    name.firstname = response.data.firstname;
    name.lastname = response.data.lastname;
  } catch (error) {
    console.error('Failed to fetch pages', error);
  }
});



const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  router.push('/auth/login');
}

</script>

<style scoped>
#logo-large {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100px;
  width: 100%;
  margin-bottom: 10px;
}
/* Light Mode */
body:not(.dark) #logo-large {
  background-image: url('@/assets/images/logo-1.svg');
}

/* Dark Mode */
body.dark #logo-large {
  background-image: url('@/assets/images/logo-2.svg');
}
</style>