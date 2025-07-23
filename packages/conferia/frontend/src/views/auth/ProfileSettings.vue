<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 pt-4 pb-20">
      <!-- Profile Picture Section -->
      <Card class="shadow-sm mb-6">
        <template #header>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">Profile Picture</h2>
          </div>
        </template>
        <template #content>
          <div class="flex flex-col items-center space-y-4 p-6">
            <div class="relative cursor-pointer" @click="showUploadDialog = true">
              <Avatar 
                v-if="user.profilePicture"
                :image="user.profilePicture"
                shape="circle"
                size="xlarge"
                class="w-24 h-24"
              />
              <div 
                v-else
                class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold"
              >
                {{ getInitials(user.firstname, user.lastname) }}
              </div>
              <div class="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-2">
                <svg class="w-4 h-4 text-white" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z"/>
                </svg>
              </div>
            </div>
            <div class="text-center">
              <h3 class="font-semibold text-gray-900 dark:text-white">Upload Photo</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Tap to change your profile photo</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- Upload Dialog -->
      <Dialog 
        v-model:visible="showUploadDialog" 
        modal 
        header="Upload Profile Picture" 
        :style="{ width: '25rem' }"
      >
        <div class="flex flex-col gap-4">
          <Button 
            label="Take Photo" 
            icon="pi pi-camera"
            @click="uploadPhoto"
            class="w-full"
          />
          <Button 
            label="Choose from Gallery" 
            icon="pi pi-image"
            severity="secondary"
            @click="uploadPhoto"
            class="w-full"
          />
        </div>
      </Dialog>

      <!-- Personal Information Section -->
      <Card class="shadow-sm mb-6">
        <template #header>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <button
              @click="getUserInformation"
              class="flex items-center justify-between w-full text-left"
            >
              <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">Personal Information</h2>
              <i :class="showUserInformation ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" 
                 class="text-blue-600 dark:text-blue-400"/>
            </button>
          </div>
        </template>
        
        <template #content>
          <div v-if="showUserInformation" class="p-6">
            <form @submit.prevent="updateUserInformation" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">First name</label>
                  <InputText
                    v-model="user.firstname"
                    placeholder="Enter first name"
                    class="w-full"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last name</label>
                  <InputText
                    v-model="user.lastname"
                    placeholder="Enter last name"
                    class="w-full"
                    required
                  />
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <InputText
                  v-model="user.email"
                  type="email"
                  placeholder="Enter email"
                  class="w-full"
                  required
                />
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                <InputText
                  v-model="user.company"
                  placeholder="Enter company"
                  class="w-full"
                />
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                <InputText
                  v-model="user.country"
                  placeholder="Enter country"
                  class="w-full"
                />
              </div>

              <!-- Privacy Setting -->
              <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <div class="flex items-start space-x-3">
                  <Checkbox
                    v-model="user.sharingChoice"
                    class="mt-1"
                    inputId="sharingChoice"
                    :binary="true"
                  />
                  <div>
                    <label for="sharingChoice" class="font-medium text-gray-900 dark:text-white cursor-pointer">Share Information</label>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Share user information with other attendees*
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                label="Update Information"
                class="w-full mt-6"
              />
              
              <div v-if="updateError" class="text-red-600 dark:text-red-400 text-sm mt-2">
                {{ updateError }}
              </div>
              <div v-if="updateSuccess" class="text-green-600 dark:text-green-400 text-sm mt-2">
                {{ updateSuccess }}
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                * Name is always shared with other attendees
              </p>
            </form>
          </div>
        </template>
      </Card>

      <!-- Password Change Section -->
      <Card class="shadow-sm mb-6">
        <template #header>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <button
              @click="getChangePassword"
              class="flex items-center justify-between w-full text-left"
            >
              <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">Change Password</h2>
              <i :class="showChangePassword ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" 
                 class="text-blue-600 dark:text-blue-400"/>
            </button>
          </div>
        </template>
        
        <template #content>
          <div v-if="showChangePassword" class="p-6">
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                <Password
                  v-model="passwordChange.oldpassword"
                  placeholder="Enter current password"
                  class="w-full"
                  toggleMask
                  :feedback="false"
                />
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                <Password
                  v-model="passwordChange.newpassword"
                  placeholder="Enter new password"
                  class="w-full"
                  toggleMask
                  :feedback="false"
                />
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                <Password
                  v-model="passwordChange.confirmpassword"
                  placeholder="Confirm new password"
                  class="w-full"
                  toggleMask
                  :feedback="false"
                />
              </div>

              <Button
                @click="updatePassword"
                label="Update Password"
                class="w-full mt-6"
              />
              
              <div v-if="changePasswordSuccess" class="text-green-600 dark:text-green-400 text-sm mt-2">
                {{ changePasswordSuccess }}
              </div>
              <div v-if="changePasswordError" class="text-red-600 dark:text-red-400 text-sm mt-2">
                {{ changePasswordError }}
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Theme Settings Section -->
      <Card class="shadow-sm">
        <template #header>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <button
              @click="getThemeSettings"
              class="flex items-center justify-between w-full text-left"
            >
              <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">Theme Settings</h2>
              <i :class="showThemeInformation ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" 
                 class="text-blue-600 dark:text-blue-400"/>
            </button>
          </div>
        </template>
        
        <template #content>
          <div v-if="showThemeInformation" class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
              </div>
              <InputSwitch
                v-model="isDarkMode"
                @change="toggleTheme"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';
import Avatar from 'primevue/avatar';

import axios from 'axios';
import backend from '#/plugins/backend.config';
import { usePhotoGallery } from '#/composables/usePhotoGallery';

onMounted(() => {
  fetchUserSettings();
});

const { takePhotoProfile, choosePhotoFromPhone } = usePhotoGallery();
const token = ref(localStorage.getItem('accessToken'));

const showUserInformation = ref(true);
const showChangePassword = ref(false);
const showNotificationsInformation = ref(false);
const showThemeInformation = ref(false);
const showUploadDialog = ref(false);

const changePasswordError = ref('');
const changePasswordSuccess = ref('');
const updateError = ref('');
const updateSuccess = ref('');

const passwordChange = ref({
  oldpassword: '',
  newpassword: '',
  confirmpassword: ''
});
const user = ref({
  email: '',
  firstname: '',
  lastname: '',
  company: '',
  country: '',
  profilePicture: '',
  id: '',
  sharingChoice: false
});

const notifications = ref({
  articles: '',
  events: ''
});

// Navigation function
const goBack = () => {
  window.history.back();
};

// Add uploadPhoto function
const uploadPhoto = async () => {
  try {
    const photoBlob = await takePhotoProfile();
    
    // Create an instance of FormData
    const formData = new FormData();
    
    // Append the photo blob to the form data
    formData.append('file', photoBlob as unknown as Blob);
    
    // Make the POST request with the form data and proper headers
    const uploadResponse = await axios.post(backend.construct('account/uploadProfilePicture'), formData, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (uploadResponse.status === 200) {
      console.log('Upload successful');
      await fetchUserSettings();
      showUploadDialog.value = false;
    }
  } catch (error) {
    console.error('Error uploading photo:', error);
  }
};

const fetchUserSettings = async () => {
  try {
    const response = await axios.get(backend.construct('account/userDetails'), { headers: { Authorization: `Bearer ${token.value}` } });
    user.value.email = response.data.email;
    user.value.firstname = response.data.firstname;
    user.value.lastname = response.data.lastname;
    user.value.company = response.data.company;
    user.value.country = response.data.country;
    user.value.id = response.data.id;
    user.value.sharingChoice = response.data.sharingChoice;

    if (response.data.profilePicture) {
      const retrieveResponse = await axios.get(backend.construct(`account/getProfilePicture/${user.value.id}`),
        { headers: {
          Authorization: `Bearer ${token.value}` },
        params: {
          format: 'webp'
        },
        responseType: 'blob' });
      user.value.profilePicture = URL.createObjectURL(retrieveResponse.data);
    }
  } catch (error) {
    console.error('Failed to fetch user details:', error);
  }
};

const updateUserInformation = async () => {
  try {
    const response = await axios.post(backend.construct('account/update'),
      { email: user.value.email,
        firstname: user.value.firstname,
        lastname: user.value.lastname,
        company: user.value.company,
        country: user.value.country,
        sharingChoice: user.value.sharingChoice,
        id: user.value.id,
        password: ''
      }, { headers: { Authorization: `Bearer ${token.value}` } });
    updateSuccess.value = 'Information updated successfully';
    updateError.value = '';
    if (response.data?.accessToken && response.data.refreshToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      token.value = response.data.accessToken;
    }
  } catch (error) {
    updateSuccess.value = '';
    updateError.value = 'Failed to update information';
    console.error('Failed to fetch user details:', error);
  }
};

/**
 *
 */
async function updatePassword() {
  try {
    if (passwordChange.value.newpassword !== passwordChange.value.confirmpassword) {
      changePasswordSuccess.value = '';
      changePasswordError.value = 'New password and confirm password does not match';
    }
    const response = await axios.post(backend.construct('account/changePassword'), { oldPassword: passwordChange.value.oldpassword, newPassword: passwordChange.value.newpassword }, { headers: { Authorization: `Bearer ${token.value}` } });
    changePasswordError.value = '';
    changePasswordSuccess.value = response.data;
    passwordChange.value.oldpassword = '';
    passwordChange.value.newpassword = '';
    passwordChange.value.confirmpassword = '';
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    changePasswordSuccess.value = '';
    changePasswordError.value = 'Old password is not correct';
  }
}

const getUserInformation = async () => {
  showUserInformation.value = !showUserInformation.value;
};
const getChangePassword = async () => {
  showChangePassword.value = !showChangePassword.value;
};
const getNotificationsSettings = async () => {
  showNotificationsInformation.value = !showNotificationsInformation.value;
};
const getThemeSettings = async () => {
  showThemeInformation.value = !showThemeInformation.value;
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
  isDarkMode.value = !isCurrentlyDark;
};

// Helper function to get user initials for placeholder
const getInitials = (firstname: string, lastname: string) => {
  const first = firstname?.charAt(0)?.toUpperCase() || '';
  const last = lastname?.charAt(0)?.toUpperCase() || '';
  return first + last || 'U';
};
</script>
