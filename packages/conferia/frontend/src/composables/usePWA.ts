import { ref, onMounted } from 'vue';

export const usePWA = () => {
  const isInstallable = ref(false);
  const deferredPrompt = ref<Event | null>(null);

  const installApp = async () => {
    if (!deferredPrompt.value) return;
    // Show the install prompt
    (deferredPrompt.value).prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await (deferredPrompt.value as any).userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // Clear the deferredPrompt for next time
    deferredPrompt.value = null;
    isInstallable.value = false;
  };

  onMounted(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt.value = e;
      // Update UI to notify the user they can install the PWA
      isInstallable.value = true;
    });

    // Listen for the appinstalled event
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      isInstallable.value = false;
    });
  });

  return {
    isInstallable,
    installApp
  };
};
