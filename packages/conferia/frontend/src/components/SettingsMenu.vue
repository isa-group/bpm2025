<template>
  <Dialog
    :visible="visible"
    modal
    position="topright"
    class="w-80"
    @update:visible="$emit('hide')">
    <template #header>
      <div class="p-0">
        <div class="flex items-center gap-3 px-2 py-1.5">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
            <span class="text-sm font-medium text-primary-700 dark:text-primary-300">
              {{ userInitials }}
            </span>
          </div>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-medium text-surface-900 dark:text-surface-100">
              {{ name.firstname }} {{ name.lastname }}
            </span>
            <span class="truncate text-xs text-surface-600 dark:text-surface-400">
              Account Settings
            </span>
          </div>
        </div>
      </div>
    </template>

    <div class="p-0">
      <!-- Menu Group: Profile -->
      <div class="px-2 py-1">
        <Button
          icon="pi pi-user"
          label="Profile Settings"
          severity="secondary"
          text
          class="w-full justify-start px-2 py-2 text-sm font-normal"
          @click="navigateAndClose('/profile/settings/')" />
        
        <Button
          icon="pi pi-bell"
          label="Notifications"
          severity="secondary"
          text
          class="w-full justify-start px-2 py-2 text-sm font-normal"
          @click="navigateAndClose('/notifications/')" />
      </div>

      <!-- Separator -->
      <div class="mx-2 border-t border-surface-200 dark:border-surface-700 my-1"></div>

      <!-- Menu Group: App -->
      <div class="px-2 py-1">
        <Button
          icon="pi pi-info-circle"
          label="About the app"
          severity="secondary"
          text
          class="w-full justify-start px-2 py-2 text-sm font-normal"
          @click="navigateAndClose('/tabs/about/')" />
      </div>

      <!-- Separator -->
      <div class="mx-2 border-t border-surface-200 dark:border-surface-700 my-1"></div>

      <!-- Menu Group: Account Actions -->
      <div class="px-2 py-1">
        <Button
          icon="pi pi-sign-out"
          label="Log out"
          severity="secondary"
          text
          class="w-full justify-start px-2 py-2 text-sm font-normal text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          @click="logout" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, reactive, computed } from 'vue';
import axios from 'axios';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import backend from '#/plugins/backend.config';

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['hide']);

const router = useRouter();
const name = reactive({
  firstname: '',
  lastname: ''
});
const token = localStorage.getItem('accessToken');

// Computed property for user initials
const userInitials = computed(() => {
  const first = name.firstname?.charAt(0) || '';
  const last = name.lastname?.charAt(0) || '';
  return (first + last).toUpperCase();
});

onMounted(async () => {
  try {
    const response = await axios.get(backend.construct('account/getName'), { headers: { Authorization: `Bearer ${token}` } });
    name.firstname = response.data.firstname;
    name.lastname = response.data.lastname;
  } catch (error) {
    console.error('Failed to fetch user name', error);
  }
});

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  router.push('/auth/login');
  emits('hide');
};

const navigateAndClose = (path: string) => {
  router.push(path);
  emits('hide');
};
</script>

<style scoped>
/* Modern dialog styling */
:deep(.p-dialog) {
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--surface-200);
  min-width: 14rem;
}

:deep(.p-dialog-header) {
  padding: 0;
  border-bottom: 1px solid var(--surface-200);
  border-radius: 12px 12px 0 0;
  background: var(--surface-0);
}

:deep(.p-dialog-content) {
  padding: 0;
  background: var(--surface-0);
  border-radius: 0 0 12px 12px;
}

/* Menu button hover effects */
:deep(.p-button.p-button-text:hover) {
  background: var(--surface-100);
  color: var(--surface-900);
}

:deep(.p-button.p-button-text) {
  border-radius: 8px;
  transition: all 0.15s ease;
}

:deep(.p-button-icon) {
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :deep(.p-dialog) {
    border-color: var(--surface-700);
    background: var(--surface-900);
  }
  
  :deep(.p-dialog-header) {
    border-bottom-color: var(--surface-700);
    background: var(--surface-900);
  }
  
  :deep(.p-dialog-content) {
    background: var(--surface-900);
  }
  
  :deep(.p-button.p-button-text:hover) {
    background: var(--surface-800);
    color: var(--surface-100);
  }
}
</style>
