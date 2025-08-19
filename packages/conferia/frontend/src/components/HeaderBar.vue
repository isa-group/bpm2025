<template>
  <header class="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800/60">
    <div class="mx-auto max-w-[1024px] h-14 flex items-center px-3 gap-2">
      <div v-if="name !== 'Home'" id="logo" class="h-8 w-8 bg-center bg-no-repeat bg-contain" />
      <h1 class="text-base font-600 truncate">{{ name }}</h1>
      <div class="ml-auto flex items-center gap-3 text-primary-600" v-if="name === 'Gallery'">
        <button class="i-ph-arrow-clockwise-duotone text-6" @click="$emit('reloadPage')" aria-label="Reload" />
        <button class="i-ph-funnel-simple-duotone text-6" @click="$emit('openFilter', $event)" aria-label="Filter" />
        <button class="i-ph-dots-three-outline-vertical-duotone text-6" @click="$emit('openActionSheet')" aria-label="Menu" />
      </div>
      <div class="ml-auto flex items-center gap-3 text-primary-600" v-else-if="name === 'My Gallery'">
        <button class="i-ph-arrow-clockwise-duotone text-6" @click="$emit('reloadPage')" aria-label="Reload" />
        <button class="i-ph-dots-three-outline-vertical-duotone text-6" @click="$emit('openActionSheet')" aria-label="Menu" />
      </div>
      <div class="ml-auto flex items-center gap-3 text-primary-600" v-else-if="name === 'Messages' || showReload">
        <button class="i-ph-arrow-clockwise-duotone text-6" @click="$emit('reloadPage')" aria-label="Reload" />
      </div>
    </div>
  </header>
  <SettingsMenu v-if="name === 'Home'" />
</template>

<script setup lang="ts">
import SettingsMenu from '#/components/SettingsMenu.vue';

defineProps({
  name: String,
  showReload: Boolean
});

defineEmits(['openActionSheet', 'reloadPage', 'openFilter']);
</script>

<style scoped>
#logo {
  background-image: url('@bpm2025-website/assets/icon');
}
</style>
