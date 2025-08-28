<template>
  <Avatar
    v-bind="$attrs"
    :image="imageUrl"
    :label="imageUrl ? undefined : userInitials"
    shape="circle"
    class="shadow-lg" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Avatar from 'primevue/avatar';

const { user, imageUrl } = defineProps<{
  user?: { firstname: string; lastname: string };
  imageUrl?: string;
}>();

const userInitials = computed(() => {
  if (!user || (!user.firstname && !user.lastname)) {
    return '';
  }

  const first = user.firstname.trim().charAt(0) || '';
  const last = user.lastname.trim().charAt(0) || '';
  return (first + last).toUpperCase();
});
</script>
