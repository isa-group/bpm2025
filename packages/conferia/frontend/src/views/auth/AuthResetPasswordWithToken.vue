<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="reset-password-container">
        <div class="signup-header">
          <h2>Reset password</h2>
        </div>
        <form id="form" @submit.prevent="resetPassword">
          <p>Please type something you'll remember</p>
          <ion-item>
            <ion-input
                label="Password"
                label-placement="stacked"
                id="firstPassword"
                type="password"
                placeholder="Password"
                v-model="resetInformation.password"
                required
            ></ion-input>
          </ion-item>
          <ion-item class="ion-padding-vertical">
            <ion-input
                label="Confirm password"
                label-placement="stacked"
                id="secondPassword"
                type="password"
                placeholder="Repeat password"
                v-model="resetInformation.confirmPassword"
                required
            ></ion-input>
          </ion-item>
          <ion-button
              type="submit"
              expand="block"
              @click="trackButtonClick('Reset Password Button', 'Auth', 'Feature')">
            Reset password
          </ion-button>

          <p v-if="resetError" class="error-message">{{ resetError }}</p>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonButton, IonInput, IonItem} from "@ionic/vue";
import {ref} from "vue";
import {useRoute, useRouter} from 'vue-router';
import axios from "axios";
import backend from "../../../backend.config";
import {googleanalytics} from "@/composables/googleanalytics";

const { trackButtonClick } = googleanalytics();

const route = useRoute();
const router = useRouter();

const resetInformation = ref({
  password: '',
  confirmPassword: ''
})

const token = route.params.token;
const resetError = ref('');

const resetPassword = async () => {
  try {
    if (resetInformation.value.password !== resetInformation.value.confirmPassword) {
      resetError.value = "The passwords do not match.";
      return false;
    }
    const resetToken = Array.isArray(token) ? token[0] : token;
    localStorage.setItem('resetToken', resetToken);
    const response = await axios.post(backend.construct("account/resetPassword"), resetInformation.value, { headers: { Authorization: `Bearer ${resetToken}` } });
    localStorage.setItem('resetToken', '');

    await router.push('/auth/login');
  } catch (error) {
    resetError.value = "Failed to reset password"
    console.error("Failed to reset password", error);

  }



}
</script>

<style scoped>
.reset-password-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  text-align: center;
}
.signup-header{
  margin-top: 2rem;
}
h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

p {
  margin-bottom: 2em;
}
#form {
  text-align: left;
  margin-top: 2rem;
}

</style>