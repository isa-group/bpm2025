<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>User Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- Avatar -->
      <div class="profile-picture-container">
        <ion-avatar id="open-action-sheet">
          <img :src="user.profilePicture || 'https://ionicframework.com/docs/img/demos/avatar.svg'" alt="Profile picture" />
        </ion-avatar>
        <ion-icon :icon="pencilOutline" class="edit-icon"></ion-icon>
      </div>
      <ion-action-sheet trigger="open-action-sheet" header="Upload profile picture" :buttons="actionSheetButtons"></ion-action-sheet>

      <!-- User information -->
      <ion-card>
        <ion-card-header @click="getUserInformation">
          <ion-card-title>User Information</ion-card-title>
        </ion-card-header>
        <ion-card-content v-if="showUserInformation">
          <form @submit.prevent="updateUserInformation">
            <ion-item>
              <ion-input
                  label="First name"
                    label-placement="stacked"
                  v-model="user.firstname"
                  required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                  label="Second name"
                  label-placement="stacked"
                  v-model="user.lastname"
                  required
              ></ion-input>
            </ion-item>
            <ion-item>
              <!---type="email"--->
              <ion-input
                  label="Email"
                  label-placement="stacked"
                  v-model="user.email"
                  required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                  label="Company"
                  label-placement="stacked"
                  v-model="user.company"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                  label="Country"
                  label-placement="stacked"
                  v-model="user.country"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-toggle slot="start" :checked="user.sharingChoice" @ionChange="toggleSharingChoice"></ion-toggle>
              <span class="toggle-text">Share user information with other attendees*</span>
            </ion-item>

            <ion-button type="submit" expand="block" class="ion-margin-vertical" @click="trackButtonClick('Update Information Button', 'Auth', 'Feature')">Update information</ion-button>
            <p v-if="updateError" class="error-message">{{ updateError }}</p>
            <p v-if="updateSuccess" class="error-message">{{ updateSuccess }}</p>
            <p>* name is always shared with other attendees</p>
          </form>
        </ion-card-content>
      </ion-card>

      <!-- Navigate to 'changePassword' -->
      <ion-card>
        <ion-card-header @click="getChangePassword">
          <ion-card-title>Change Password</ion-card-title>
        </ion-card-header>
        <ion-card-content v-if="showChangePassword">
          <ion-item>
            <ion-input
                label="Old Password"
                label-placement="stacked"
                v-model="passwordChange.oldpassword"
                type="password"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
                label="New Password"
                label-placement="stacked"
                v-model="passwordChange.newpassword"
                type="password"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
                label="Confirm New Password"
                label-placement="stacked"
                v-model="passwordChange.confirmpassword"
                type="password"
            ></ion-input>
          </ion-item>
          <ion-button type="submit" expand="block" shape="round" class="button" @click="() => { trackButtonClick('Update Password Button', 'Auth', 'Feature'); updatePassword(); }">Update password</ion-button>
          <p v-if="changePasswordSuccess" class="error-message">{{ changePasswordSuccess }}</p>
          <p v-if="changePasswordError" class="success-message">{{ changePasswordError }}</p>
        </ion-card-content>
      </ion-card>

      <!-- Theme Settings Section -->
      <ion-card>
        <ion-card-header @click="getThemeSettings">
          <ion-card-title>Theme Settings</ion-card-title>
        </ion-card-header>
        <ion-card-content v-if="showThemeInformation">
          <ion-item>
            <div class="toggle-theme">
              <ion-toggle :checked="isDarkMode" @ionChange="() => { trackButtonClick('Dark Mode Toggle', 'Auth', 'Feature'); toggleTheme(); }"></ion-toggle>
              <span class="toggle-label">Dark mode </span>
            </div>
          </ion-item>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {
  IonActionSheet,
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/vue';

import axios from "axios";
import {camera, pencilOutline} from "ionicons/icons";
import {usePhotoGallery} from '@/composables/usePhotoGallery';
import backend from "../../../backend.config";
import {googleanalytics} from "@/composables/googleanalytics";

const { trackButtonClick } = googleanalytics();

onMounted(() => {
  fetchUserSettings();
});

const { takePhotoProfile, choosePhotoFromPhone } = usePhotoGallery()
const token = ref(localStorage.getItem("accessToken"))

const showUserInformation = ref(true)
const showChangePassword = ref(false)
const showNotificationsInformation = ref(false)
const showThemeInformation = ref(false)


const changePasswordError = ref('')
const changePasswordSuccess = ref('')
const updateError = ref('')
const updateSuccess = ref('')

const passwordChange = ref({
  oldpassword: '',
  newpassword: '',
  confirmpassword: ''
})
const user = ref({
  email: '',
  firstname: '',
  lastname: '',
  company: '',
  country: '',
  profilePicture: '',
  id: '',
  sharingChoice: false
})

const notifications = ref({
  articles: '',
  events: ''
})

const fetchUserSettings = async () => {
  try {
    const response = await axios.get(backend.construct("account/userDetails"),{ headers: { Authorization: `Bearer ${token.value}` } });
    user.value.email = response.data.email;
    user.value.firstname = response.data.firstname;
    user.value.lastname = response.data.lastname;
    user.value.company = response.data.company;
    user.value.country = response.data.country;
    user.value.id = response.data.id;
    user.value.sharingChoice = response.data.sharingChoice

    if (response.data.profilePicture) {
      const retrieveResponse = await axios.get(backend.construct(`account/getProfilePicture/${user.value.id}`),
          { headers: {
            Authorization: `Bearer ${token.value}` },
            params: {
            format: 'webp'
            },
            responseType: 'blob'})
      user.value.profilePicture = URL.createObjectURL(retrieveResponse.data);
    }
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
}

const updateUserInformation = async () => {
  try {
    const response = await axios.post(backend.construct("account/update"),
        {email: user.value.email,
          firstname: user.value.firstname,
          lastname: user.value.lastname,
          company: user.value.company,
          country: user.value.country,
          sharingChoice: user.value.sharingChoice,
          id: user.value.id,
          password: ''
          },{ headers: { Authorization: `Bearer ${token.value}` } });
    updateSuccess.value ="Information updated successfully";
    updateError.value='';
    if (response.data && response.data.accessToken && response.data.refreshToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      token.value = response.data.accessToken;
    }

  } catch (error) {
    updateSuccess.value ='';
    updateError.value="Failed to update information";
    console.error("Failed to fetch user details:", error);
  }
}

async function updatePassword() {
  try {
    if (passwordChange.value.newpassword !== passwordChange.value.confirmpassword) {
      changePasswordSuccess.value = '';
      changePasswordError.value = 'New password and confirm password does not match';
    }
    const response = await axios.post(backend.construct("account/changePassword"), {oldPassword: passwordChange.value.oldpassword,newPassword: passwordChange.value.newpassword},{ headers: { Authorization: `Bearer ${token.value}` } });
    changePasswordError.value = '';
    changePasswordSuccess.value = response.data;
    passwordChange.value.oldpassword = '';
    passwordChange.value.newpassword = '';
    passwordChange.value.confirmpassword = '';


  } catch (error) {
    console.error("Failed to fetch user details:", error);
    changePasswordSuccess.value = '';
    changePasswordError.value = 'Old password is not correct';
  }
}

const getUserInformation = async () => {
  showUserInformation.value = !showUserInformation.value;
}
const getChangePassword = async () => {
  showChangePassword.value = !showChangePassword.value;
}
const getNotifikationsSettings = async () => {
  showNotificationsInformation.value = !showNotificationsInformation.value;
}
const getThemeSettings = async () => {
  showThemeInformation.value = !showThemeInformation.value;
}
const toggleSharingChoice = async () => {
  user.value.sharingChoice = !user.value.sharingChoice;
};

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const isDarkMode = ref(getInitialTheme());

const toggleTheme = () => {
  const isCurrentlyDark = document.body.classList.contains('dark');
  const newTheme = !isCurrentlyDark ? 'dark' : 'light';

  document.body.classList.toggle('dark', !isCurrentlyDark);
  localStorage.setItem('theme', newTheme);
};

const actionSheetButtons = [
  {
    text: 'Edit profile picture',
    icon: camera,
    handler: async () => {
      try {

        const photoBlob = await takePhotoProfile();

        // Create an instance of FormData
        const formData = new FormData();

        // Append the photo blob to the form data, the 'file' key should match the name expected in the backend
        formData.append('file', photoBlob as Blob);

        // Make the POST request with the form data and proper headers
        const uploadResponse = await axios.post(backend.construct("account/uploadProfilePicture"), formData, {
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'multipart/form-data' // This might be optional as axios sets it automatically with the correct boundary
          }
        });

        if (uploadResponse.status === 200) {
          console.log('Upload successful');
          trackButtonClick('Change profile picture','Profile','Feature')
          await fetchUserSettings();

        }

      } catch (error) {
        console.error('Error fetching signed URL:', error);
      }
    }
  }
]
</script>

<style scoped>
.profile-picture-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 150px; /* Avatar size */
  height: 150px;
}

.profile-picture-container ion-avatar {
  width: 100%; /* Set the desired size */
  height: 100%; /* Set the desired size */
  z-index: 1;
}

.profile-picture-container ion-avatar img {
  width: 100%; /* Ensure the image fills the avatar */
  height: 100%; /* Maintain aspect ratio */

}

.edit-icon {
  position: absolute;
  top: 10%;
  right: 0;
  font-size: 30px; /* Adjust icon size as needed */
  z-index: 10;
}

ion-item {
  --background: transparent;
}

.toggle-text {
  font-size: 14px;
  white-space: normal;
  overflow: hidden; /* Prevents text overflow */
  margin-left: 3px;
}
.toggle-label {
  font-size: 20px;
  margin-left: 60%;
}
.toggle-theme {
  display: flex;
  white-space: nowrap;
}

</style>