<template>
  <IonMenu
    side="end"
    content-id="main-content"
    menu-id="settings-menu">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Account</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="ion-padding">
        <!--        <img src="#/assets/images/icpm-logo-1.png" />-->
        <div id="logo-large" />
        <p>Welcome {{ name.firstname }} {{ name.lastname }}</p>
      </div>
      <IonList lines="full">
        <IonItem
          button
          :router-link="'/profile/settings/'">
          <IonLabel>
            <template #start>
              <IonIcon :icon="settingsOutline" />
            </template>
            Settings
          </IonLabel>
        </IonItem>
        <IonItem
          button
          :router-link="'/tabs/about/'">
          <IonLabel>
            <template #start>
              <IonIcon :icon="informationCircleOutline" />
            </template>
            About the app
          </IonLabel>
        </IonItem>
        <IonItem
          button
          @click="() => { logout(); }">
          <IonLabel>
            <template #start>
              <IonIcon :icon="logOutOutline" />
            </template>
            Logout
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
</template>

<script setup lang="ts">
import { informationCircleOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import backend from '../../backend.config';

const router = useRouter();
const name = reactive({
  firstname: '',
  lastname: ''
});
const token = localStorage.getItem('accessToken');

onMounted(async () => {
  try {
    const response = await axios.get(backend.construct('account/getName'), { headers: { Authorization: `Bearer ${token}` } });
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
};

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
  background-image: url('#/assets/images/logo-1.svg');
}

/* Dark Mode */
body.dark #logo-large {
  background-image: url('#/assets/images/logo-2.svg');
}
</style>
