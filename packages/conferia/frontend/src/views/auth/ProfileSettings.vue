<template>
  <TabsPage
    title="Profile Settings"
    subtitle="Manage your account and preferences">
    <div class="px-4 py-6 pb-20 space-y-6">
      <!-- Profile Picture Section -->
      <Card class="overflow-hidden shadow-sm">
        <template #header>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">
              Profile Picture
            </h2>
          </div>
        </template>
        <template #content>
          <div class="flex flex-col items-center space-y-4 p-6">
            <div
              class="relative cursor-pointer"
              @click="!isUploadingPhoto && (showUploadDialog = true)">
              <div
                v-if="user.profilePicture"
                class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
                :class="{ 'opacity-50': isUploadingPhoto }">
                <img
                  :src="user.profilePicture"
                  :alt="`${user.firstname} ${user.lastname}`"
                  class="w-full h-full object-cover">
              </div>
              <div
                v-else
                class="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-lg"
                :class="{ 'opacity-50': isUploadingPhoto }">
                <div class="logo-medium opacity-60" />
              </div>

              <!-- Loading spinner overlay -->
              <div
                v-if="isUploadingPhoto"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <svg
                  class="animate-spin w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4" />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>

              <div
                class="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 rounded-full p-2 shadow-md transition-colors duration-200"
                :class="{ 'bg-gray-400 cursor-not-allowed': isUploadingPhoto }">
                <svg
                  class="w-4 h-4 text-white"
                  viewBox="0 0 32 32"
                  fill="currentColor">
                  <path d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z" />
                </svg>
              </div>
            </div>
            <div class="text-center">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ isUploadingPhoto ? 'Subiendo foto...' : 'Upload Photo' }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ isUploadingPhoto ? 'Por favor espera...' : 'Tap to change your profile photo' }}
              </p>
            </div>

            <!-- Show upload status messages here -->
            <div
              v-if="updateError && updateError.includes('foto')"
              class="text-red-600 dark:text-red-400 text-sm text-center">
              {{ updateError }}
            </div>
            <div
              v-if="updateSuccess && updateSuccess.includes('foto')"
              class="text-green-600 dark:text-green-400 text-sm text-center">
              {{ updateSuccess }}
            </div>
          </div>
        </template>
      </Card>

      <!-- Upload Dialog -->
      <Dialog
        v-model:visible="showUploadDialog"
        modal
        header="Upload Profile Picture"
        :draggable="false"
        :closable="true"
        :dismissable-mask="true"
        class="upload-dialog"
        :style="{
          width: '90vw',
          maxWidth: '400px',
          margin: '0 1rem'
        }"
        :breakpoints="{ '960px': '90vw', '640px': '95vw' }">
        <template #header>
          <div class="flex items-center space-x-3 w-full px-6 py-4">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-700 rounded-full flex items-center justify-center">
              <svg
                class="w-5 h-5 text-blue-600 dark:text-blue-300"
                viewBox="0 0 32 32"
                fill="currentColor">
                <path d="M16 10c3.9 0 7 3.1 7 7s-3.1 7-7 7s-7-3.1-7-7s3.1-7 7-7m0-2c-5 0-9 4-9 9s4 9 9 9s9-4 9-9s-4-9-9-9zM16 13c-2.2 0-4 1.8-4 4s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Upload Profile Picture
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Choose how to add your photo
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-5 p-6">
          <!-- Camera Option -->
          <button
            :disabled="isUploadingPhoto"
            class="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            @click="takePhoto">
            <div class="flex items-center space-x-4">
              <div class="text-left flex-1">
                <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Take Photo
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Use your camera to take a new photo
                </p>
              </div>
              <svg
                class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                viewBox="0 0 32 32"
                fill="currentColor">
                <path d="M12 8l10 8l-10 8z" />
              </svg>
            </div>
          </button>

          <!-- Gallery Option -->
          <button
            :disabled="isUploadingPhoto"
            class="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            @click="chooseFromGallery">
            <div class="flex items-center space-x-4">
              <div class="text-left flex-1">
                <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  Choose from Gallery
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Select an existing photo from your device
                </p>
              </div>
              <svg
                class="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200"
                viewBox="0 0 32 32"
                fill="currentColor">
                <path d="M12 8l10 8l-10 8z" />
              </svg>
            </div>
          </button>

          <!-- Cancel Button -->
          <div class="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
            <Button
              label="Cancel"
              severity="secondary"
              outlined
              class="w-full"
              @click="showUploadDialog = false" />
          </div>
        </div>
      </Dialog>

      <!-- Personal Information Section -->
      <Card class="overflow-hidden shadow-sm">
        <template #header>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <button
              class="flex items-center justify-between w-full text-left group"
              @click="getUserInformation">
              <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">
                Personal Information
              </h2>
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-700 rounded-full flex items-center justify-center transition-transform duration-200">
                <svg
                  class="w-4 h-4 text-blue-600 dark:text-blue-300 transition-transform duration-200"
                  :class="{ 'rotate-180': !showUserInformation }"
                  viewBox="0 0 32 32"
                  fill="currentColor">
                  <path d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" />
                </svg>
              </div>
            </button>
          </div>
        </template>

        <template #content>
          <div
            v-if="showUserInformation"
            class="p-6 transition-all duration-300 ease-in-out">
            <form
              class="space-y-4"
              @submit.prevent="updateUserInformation">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">First name</label>
                  <InputText
                    v-model="user.firstname"
                    placeholder="Enter first name"
                    class="w-full"
                    required />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last name</label>
                  <InputText
                    v-model="user.lastname"
                    placeholder="Enter last name"
                    class="w-full"
                    required />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <InputText
                  v-model="user.email"
                  type="email"
                  placeholder="Enter email"
                  class="w-full"
                  required />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                <InputText
                  v-model="user.company"
                  placeholder="Enter company"
                  class="w-full" />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                <InputText
                  v-model="user.country"
                  placeholder="Enter country"
                  class="w-full" />
              </div>

              <!-- Privacy Setting -->
              <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <div class="flex items-start space-x-3">
                  <Checkbox
                    v-model="user.sharingChoice"
                    class="mt-1"
                    input-id="sharingChoice"
                    :binary="true" />
                  <div>
                    <label
                      for="sharingChoice"
                      class="font-medium text-gray-900 dark:text-white cursor-pointer">Share Information</label>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Share user information with other attendees*
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                label="Update Information"
                class="w-full mt-6" />

              <div
                v-if="updateError"
                class="text-red-600 dark:text-red-400 text-sm mt-2">
                {{ updateError }}
              </div>
              <div
                v-if="updateSuccess"
                class="text-green-600 dark:text-green-400 text-sm mt-2">
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
      <Card class="overflow-hidden shadow-sm">
        <template #header>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <button
              class="flex items-center justify-between w-full text-left group"
              @click="getChangePassword">
              <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">
                Change Password
              </h2>
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-700 rounded-full flex items-center justify-center transition-transform duration-200">
                <svg
                  class="w-4 h-4 text-blue-600 dark:text-blue-300 transition-transform duration-200"
                  :class="{ 'rotate-180': !showChangePassword }"
                  viewBox="0 0 32 32"
                  fill="currentColor">
                  <path d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" />
                </svg>
              </div>
            </button>
          </div>
        </template>

        <template #content>
          <div
            v-if="showChangePassword"
            class="p-6 transition-all duration-300 ease-in-out">
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                <Password
                  v-model="passwordChange.oldpassword"
                  placeholder="Enter current password"
                  class="w-full"
                  toggle-mask
                  :feedback="false" />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                <Password
                  v-model="passwordChange.newpassword"
                  placeholder="Enter new password"
                  class="w-full"
                  toggle-mask
                  :feedback="false" />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                <Password
                  v-model="passwordChange.confirmpassword"
                  placeholder="Confirm new password"
                  class="w-full"
                  toggle-mask
                  :feedback="false" />
              </div>

              <Button
                label="Update Password"
                class="w-full mt-6"
                @click="updatePassword" />

              <div
                v-if="changePasswordSuccess"
                class="text-green-600 dark:text-green-400 text-sm mt-2">
                {{ changePasswordSuccess }}
              </div>
              <div
                v-if="changePasswordError"
                class="text-red-600 dark:text-red-400 text-sm mt-2">
                {{ changePasswordError }}
              </div>
            </div>
          </div>
        </template>
      </Card>

      <div
        class="p-6 rounded-xl flex items-center space-x-4 cursor-pointer bg-red-100 hover:bg-red-300 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
        @click="logout">
        <Button
          icon="i-tabler:door-exit"
          size="small"
          variant="outlined"
          rounded
          @click="logout" />
        <h1>
          Log out
        </h1>
      </div>
      <RouterLink to="/tabs/about">
        <div
          class="p-6 rounded-xl flex items-center space-x-4 cursor-pointer bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-600">
          <Button
            icon="i-tabler:info-circle"
            size="small"
            rounded
            variant="outlined" />
          <h1>
            About
          </h1>
        </div>
      </RouterLink>
    </div>
  </TabsPage>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';
import { isAxiosError } from 'axios';
import TabsPage from '#/components/TabsPage.vue';
import { usePhotoGallery } from '#/composables/usePhotoGallery';
import {
  axiosKey,
  accessTokenKey,
  userIdKey,
  refreshTokenKey
} from '#/plugins/symbols';

const router = useRouter();
const { takePhotoProfile, choosePhotoFromPhone } = usePhotoGallery();
const accessToken = inject(accessTokenKey)!;
const refreshToken = inject(refreshTokenKey)!;
const userId = inject(userIdKey)!;
const axios = inject(axiosKey)!;

void fetchUserSettings();

const logout = () => {
  accessToken.value = undefined;
  refreshToken.value = undefined;
  userId.value = undefined;
  void router.push('/auth/login');
};

const showUserInformation = ref(true);
const showChangePassword = ref(false);
const showUploadDialog = ref(false);
const isUploadingPhoto = ref(false);

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

// Add uploadPhoto function
const takePhoto = async () => {
  try {
    showUploadDialog.value = false; // Close dialog immediately
    const photoBlob = await takePhotoProfile();

    // Check if we got a valid photo
    if (photoBlob.size === 0) {
      updateError.value = 'No se pudo capturar la foto. Inténtalo de nuevo.';
      return;
    }

    await uploadPhotoBlob(photoBlob);
  } catch (error) {
    console.error('Error taking photo:', error);
    updateError.value = error instanceof Error ? error.message : 'Error al tomar la foto';
    updateSuccess.value = '';
  }
};

const chooseFromGallery = async () => {
  try {
    showUploadDialog.value = false; // Close dialog immediately
    const photoBlob = await choosePhotoFromPhone();

    if (photoBlob.size > 0) {
      await uploadPhotoBlob(photoBlob);
    } else {
      updateError.value = 'No se seleccionó ninguna foto válida.';
    }
  } catch (error) {
    console.error('Error choosing photo from gallery:', error);
    // If user cancelled or no file selected, don't show error
    if (error instanceof Error && error.message !== 'File selection was cancelled') {
      updateError.value = 'Error al seleccionar la foto de la galería';
      updateSuccess.value = '';
    }
  }
};

const uploadPhotoBlob = async (photoBlob: Blob) => {
  try {
    // Set uploading state
    isUploadingPhoto.value = true;

    // Clear previous messages
    updateError.value = '';
    updateSuccess.value = '';

    // Validate the blob
    if (photoBlob.size === 0) {
      updateError.value = 'La imagen seleccionada no es válida.';
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (photoBlob.size > maxSize) {
      updateError.value = 'La imagen es demasiado grande. El tamaño máximo es 5MB.';
      return;
    }

    // Create an instance of FormData
    const formData = new FormData();

    // Append the photo blob to the form data
    formData.append('file', photoBlob, 'profile-picture.jpg');

    // Make the POST request with the form data and proper headers
    const uploadResponse = await axios.post('account/uploadProfilePicture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000 // 30 second timeout
    });

    if (uploadResponse.status === 200) {
      updateSuccess.value = 'Foto de perfil actualizada correctamente.';
      await fetchUserSettings();
      showUploadDialog.value = false;
    } else {
      updateError.value = 'Error al subir la foto. Inténtalo de nuevo.';
    }
  } catch (error) {
    console.error('Error uploading photo:', error);

    if (isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        updateError.value = 'Tiempo de espera agotado. Verifica tu conexión e inténtalo de nuevo.';
      } else if (error.response?.status === 413) {
        updateError.value = 'La imagen es demasiado grande. Intenta con una imagen más pequeña.';
      } else if (error.response?.status === 401) {
        updateError.value = 'Sesión expirada. Por favor, inicia sesión de nuevo.';
      } else {
        updateError.value = `Error al subir la foto: ${error.response?.data?.message ?? error.message}`;
      }
    } else {
      updateError.value = 'Error inesperado al subir la foto. Inténtalo de nuevo.';
    }
    updateSuccess.value = '';
  } finally {
    // Always reset uploading state
    isUploadingPhoto.value = false;
  }
};

/**
 * Gets the current user's settings
 */
async function fetchUserSettings() {
  try {
    const response = await axios.get('account/userDetails');
    user.value = { ...response.data };

    if (response.data.profilePicture) {
      const retrieveResponse = await axios.get(`account/getProfilePicture/${user.value.id}`, {
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
    await axios.post('account/update',
      { email: user.value.email,
        firstname: user.value.firstname,
        lastname: user.value.lastname,
        company: user.value.company,
        country: user.value.country,
        sharingChoice: user.value.sharingChoice,
        id: user.value.id,
        password: ''
      });
    updateSuccess.value = 'Information updated successfully';
    updateError.value = '';
  } catch (error) {
    updateSuccess.value = '';
    updateError.value = 'Failed to update information';
    console.error('Failed to fetch user details:', error);
  }
};

/**
 * Updates the user's password with validation
 */
async function updatePassword() {
  try {
    if (passwordChange.value.newpassword !== passwordChange.value.confirmpassword) {
      changePasswordSuccess.value = '';
      changePasswordError.value = 'New password and confirm password does not match';
    }
    const response = await axios.post('account/changePassword', {
      oldPassword: passwordChange.value.oldpassword,
      newPassword: passwordChange.value.newpassword
    });
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

const getUserInformation = () => {
  showUserInformation.value = !showUserInformation.value;
};
const getChangePassword = () => {
  showChangePassword.value = !showChangePassword.value;
};
</script>

<style scoped>
/* Smooth transitions for dropdown arrows */
.group:hover .w-8 {
  background-color: rgba(59, 130, 246, 0.2);
}

.dark .group:hover .w-8 {
  background-color: rgba(59, 130, 246, 0.3);
}

/* Smooth rotation animation for dropdown arrows */
.rotate-180 {
  transform: rotate(180deg);
}

/* Dropdown content animation */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Profile picture hover effect */
.cursor-pointer:hover .absolute {
  transform: scale(1.1);
}

/* Focus styles for accessibility */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Custom scrollbar for content areas */
.space-y-4::-webkit-scrollbar {
  width: 4px;
}

.space-y-4::-webkit-scrollbar-track {
  background: transparent;
}

.space-y-4::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.dark .space-y-4::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
}

/* Enhanced button hover effects for dialog */
.upload-dialog button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .upload-dialog button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Logo styles for profile picture placeholder */
.logo-medium {
  background-image: url('@bpm2025-website/assets/icon?url');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 48px;
  width: 48px;
  filter: grayscale(20%);
}

.dark .logo-medium {
  filter: grayscale(40%) brightness(0.8);
}
</style>
