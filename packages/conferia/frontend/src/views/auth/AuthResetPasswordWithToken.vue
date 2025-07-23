<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="reset-password-container">
        <div class="signup-header">
          <h2>Reset password</h2>
        </div>
        <form
          id="form"
          @submit.prevent="resetPassword">
          <p>Please type something you'll remember</p>
          <IonItem>
            <IonInput
              id="firstPassword"
              v-model="resetInformation.password"
              label="Password"
              label-placement="stacked"
              type="password"
              placeholder="Password"
              required />
          </IonItem>
          <IonItem class="ion-padding-vertical">
            <IonInput
              id="secondPassword"
              v-model="resetInformation.confirmPassword"
              label="Confirm password"
              label-placement="stacked"
              type="password"
              placeholder="Repeat password"
              required />
          </IonItem>
          <IonButton
            type="submit"
            expand="block">
            Reset password
          </IonButton>

          <p
            v-if="resetError"
            class="error-message">
            {{ resetError }}
          </p>
        </form>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonInput, IonItem } from '@ionic/vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import backend from '../../../backend.config';

const route = useRoute();
const router = useRouter();

const resetInformation = ref({
  password: '',
  confirmPassword: ''
});

const token = route.params.token;
const resetError = ref('');

const resetPassword = async () => {
  try {
    if (resetInformation.value.password !== resetInformation.value.confirmPassword) {
      resetError.value = 'The passwords do not match.';
      return false;
    }
    const resetToken = Array.isArray(token) ? token[0] : token;
    localStorage.setItem('resetToken', resetToken);
    const response = await axios.post(backend.construct('account/resetPassword'), resetInformation.value, { headers: { Authorization: `Bearer ${resetToken}` } });
    localStorage.setItem('resetToken', '');

    await router.push('/auth/login');
  } catch (error) {
    resetError.value = 'Failed to reset password';
    console.error('Failed to reset password', error);
  }
};
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
