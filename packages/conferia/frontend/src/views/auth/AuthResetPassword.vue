<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/auth/login"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <div class="reset-container">
        <div class="reset-header">
          <h1>Reset password</h1>
        </div>
        <form @submit.prevent="sendResetEmail">
          <p>Please enter your email address to receive a reset link.</p>
          <ion-item>
            <ion-input
                id="email"
                placeholder="email@email.com"
                type="email"
                v-model="resetUser.receiver"
                label="Your email"
                label-placement="stacked"
                required>
            </ion-input>
          </ion-item>
          <ion-button type="submit" expand="block" shape="round" @click="trackButtonClick('Send Reset Email Button', 'Auth', 'Feature')">Send reset email</ion-button>
          <p v-if="resetEmailError" class="error-message">{{ resetEmailError }}</p>
          <p v-if="resetEmailSuccess" class="success-message">{{ resetEmailSuccess }}</p>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonInput,
  IonPage,
  IonContent,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonHeader,
  IonToolbar, IonItem
} from "@ionic/vue";
import {ref} from "vue";
import axios from "axios";
import backend from "../../../backend.config";
import {googleanalytics} from "@/composables/googleanalytics";

const { trackButtonClick } = googleanalytics();

const resetEmailError = ref('');
const resetEmailSuccess = ref('');

const resetUser = ref( {
  receiver: ''
});

const sendResetEmail = async () => {
  try {
    localStorage.setItem('accessToken', '');
    await axios.post(backend.construct("auth/resetPassword"), resetUser.value);
    resetUser.value.receiver = '';
    resetEmailSuccess.value = 'Email send successfully'

  } catch (error) {
    // Handle error, e.g., display an error message
    resetEmailError.value = 'User with email not found';
  }
};

</script>

<style scoped>
.reset-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  text-align: center;
}

.reset-header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

form {
  text-align: left;
  margin-top: 2rem;
}

ion-input {
  //--padding-start: 5px;
  //--placeholder-color: rgba(255, 255, 255, 0.6);
  //--color: #fff;
  //background: #000;
  //border: 1px solid #fff;
  //border-radius: 4px;
  //margin-bottom: 2rem;
}

ion-button {
  --color: white;
  margin-top: 2.5rem;
  --border-radius: 4px;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.success-message {
  color: #428cff;
  margin-top: 1rem;
}
</style>