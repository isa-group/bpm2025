<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Apple-style Header -->
    <div class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between px-4 py-4">
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Gallery</h1>
          <p v-if="!selectMultiple" class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {{ imagesListMyGallery.length }} {{ imagesListMyGallery.length === 1 ? 'photo' : 'photos' }}
          </p>
          <p v-else class="text-sm text-blue-600 dark:text-blue-400 mt-1">
            {{ imagesSelectedList.length }} selected
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <Button
            v-if="selectMultiple && imagesSelectedList.length > 0"
            label="Delete Selected"
            severity="danger"
            size="small"
            @click="deleteSelectedImages"
          />
          <Button
            :label="selectMultiple ? 'Cancel' : 'Select'"
            :severity="selectMultiple ? 'secondary' : 'primary'"
            size="small"
            @click="toggleSelectMode"
          />
          <Button
            label="Upload"
            severity="primary"
            size="small"
            @click="uploadGalleryImage"
          >
            <i class="i-carbon-add mr-1"></i>
          </Button>
        </div>
      </div>
    </div>
    
    <div class="px-4 py-6 pb-20">
      <!-- Gallery Grid -->
      <div v-if="imagesListMyGallery.length > 0" class="grid grid-cols-3 gap-2">
        <div 
          v-for="(image, index) in imagesListMyGallery"
          :key="index"
          class="aspect-square relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
          :class="{ 
            'ring-4 ring-blue-500': imagesSelectedList.includes(image),
            'opacity-75': selectMultiple && !imagesSelectedList.includes(image)
          }"
          @click="selectMultiple ? selectImage(image) : goToImage(image)"
        >
          <img 
            :src="getImageWebP(image)"
            :alt="`Mi imagen ${index + 1}`"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          
          <!-- Selection indicator -->
          <div 
            v-if="selectMultiple && imagesSelectedList.includes(image)"
            class="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
          >
            <i class="i-carbon-checkmark text-xs"></i>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-else class="text-center py-12">
        <div class="mb-4">
          <i class="i-carbon-image text-6xl text-gray-400"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No tienes imágenes
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Aún no has subido imágenes a tu galería personal
        </p>
        <Button 
          label="Subir imagen" 
          @click="uploadGalleryImage"
          severity="primary"
        />
      </div>
    </div>
    
    <!-- Floating Action Buttons -->
    <div class="fixed bottom-20 right-4 z-50">
      <!-- Multiple selection mode -->
      <template v-if="selectMultiple">
        <div class="flex gap-2 mb-2">
          <Button 
            @click="untoggleSelectImage"
            severity="secondary"
            rounded
            size="large"
            class="shadow-lg"
          >
            <template #icon>
              <i class="i-carbon-close text-xl"></i>
            </template>
          </Button>
          
          <Button 
            @click="deleteGalleryImage"
            severity="danger"
            rounded
            size="large"
            class="shadow-lg"
            :disabled="imagesSelectedList.length === 0"
          >
            <template #icon>
              <i class="i-carbon-trash-can text-xl"></i>
            </template>
          </Button>
          
          <Button 
            @click="downloadImages"
            severity="primary"
            rounded
            size="large"
            class="shadow-lg"
            :disabled="imagesSelectedList.length === 0"
          >
            <template #icon>
              <i class="i-carbon-download text-xl"></i>
            </template>
          </Button>
        </div>
      </template>
      
      <!-- Normal mode with menu -->
      <template v-else>
        <div class="flex flex-col gap-2">
          <Button 
            @click="() => selectMultiple = true"
            severity="secondary"
            rounded
            size="large"
            class="shadow-lg"
          >
            <template #icon>
              <i class="i-carbon-checkbox text-xl"></i>
            </template>
          </Button>
          
          <Button 
            @click="uploadGalleryImage"
            severity="primary"
            rounded
            size="large"
            class="shadow-lg"
          >
            <template #icon>
              <i class="i-carbon-add text-xl"></i>
            </template>
          </Button>
        </div>
      </template>
    </div>
    
    <!-- Menu Button -->
    <div class="fixed bottom-20 left-4 z-50">
      <Button 
        @click="() => $router.push('/tabs/images')"
        severity="secondary"
        rounded
        size="large"
        class="shadow-lg"
      >
        <template #icon>
          <i class="i-carbon-gallery text-xl"></i>
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import Button from 'primevue/button';
import backend from '#/plugins/backend.config';
import { usePhotoGallery } from '#/composables/usePhotoGallery';
import router from '#/plugins/router';

const { takePhotoGallery } = usePhotoGallery();
const toast = useToast();
const token = ref(localStorage.getItem('accessToken'));

const imagesListMyGallery = ref<string[]>([]);
const selectMultiple = ref(false);
const imagesSelectedList = ref<string[]>([]);

onMounted(async (): Promise<void> => {
  await fetchMyGalleryMetadata();
});

onBeforeRouteUpdate((to, from, next) => {
  if (to.path === '/tabs/images/myGallery') {
    fetchMyGalleryMetadata();
  }
  next();
});

const resetMyGalleryData = async (): Promise<void> => {
  imagesListMyGallery.value = [];
  imagesSelectedList.value = [];
  selectMultiple.value = false;
};

onBeforeRouteLeave((to, from) => {
  resetMyGalleryData();
});

const reloadPage = async (): Promise<void> => {
  imagesListMyGallery.value = [];
  await fetchMyGalleryMetadata();
};

const fetchMyGalleryMetadata = async (): Promise<void> => {
  try {
    const response = await axios.get(backend.construct('gallery/myImages'), { 
      headers: { Authorization: `Bearer ${token.value}` } 
    });
    if (response.data.imagePaths.length > 0) {
      imagesListMyGallery.value = [...imagesListMyGallery.value, ...response.data.imagePaths];
    }
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar tus imágenes',
      life: 3000
    });
  }
};

const uploadGalleryImage = async (): Promise<void> => {
  try {
    // Simulamos la captura de foto por ahora
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    const file = await new Promise<File | null>((resolve) => {
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        resolve(target.files?.[0] || null);
      };
      input.click();
    });
    
    if (!file) {
      toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No se seleccionó ninguna imagen',
        life: 3000
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    toast.add({
      severity: 'info',
      summary: 'Procesando',
      detail: 'Tu imagen se está procesando...',
      life: 5000
    });

    const uploadResponse = await axios.post(backend.construct('gallery/images'), formData, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (uploadResponse.status === 200) {
      console.log('Upload successful');
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Tu imagen ha sido publicada',
        life: 5000
      });
      await reloadPage();
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo subir la imagen',
      life: 3000
    });
  }
};

const deleteGalleryImage = async (): Promise<void> => {
  if (imagesSelectedList.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'Selecciona al menos una imagen',
      life: 3000
    });
    return;
  }
  
  try {
    await axios.delete(backend.construct('gallery/images'), {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      data: {
        imagePaths: imagesSelectedList.value
      }
    });
    
    imagesListMyGallery.value = imagesListMyGallery.value.filter(
      image => !imagesSelectedList.value.includes(image)
    );
    
    toast.add({
      severity: 'success',
      summary: 'Eliminado',
      detail: `Se eliminaron ${imagesSelectedList.value.length} imágenes`,
      life: 3000
    });
    
    imagesSelectedList.value = [];
    selectMultiple.value = false;
  } catch (error) {
    console.error('Error deleting image:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron eliminar las imágenes',
      life: 3000
    });
  }
};

const downloadImage = (filePath: string): void => {
  const image = getImageJPG(filePath);
  fetch(image)
    .then(res => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo descargar la imagen',
        life: 3000
      });
    });
};

const downloadImages = (): void => {
  if (imagesSelectedList.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'Selecciona al menos una imagen',
      life: 3000
    });
    return;
  }
  
  for (const image of imagesSelectedList.value) {
    downloadImage(image);
  }
  
  toast.add({
    severity: 'success',
    summary: 'Descarga iniciada',
    detail: `Descargando ${imagesSelectedList.value.length} imágenes`,
    life: 3000
  });
  
  imagesSelectedList.value = [];
};

const getImageWebP = (filepath: string): string => {
  return backend.construct(`gallery/images/${filepath}?format=webp`);
};

const getImageJPG = (filepath: string): string => {
  return backend.construct(`gallery/images/${filepath}?format=jpg`);
};

const goToImage = (imageId: string): void => {
  router.push(`/tabs/singleimage/${imageId}`);
};

const selectImage = (imageId: string): void => {
  if (imagesSelectedList.value.includes(imageId)) {
    imagesSelectedList.value = imagesSelectedList.value.filter(image => image !== imageId);
    return;
  }
  imagesSelectedList.value.push(imageId);
};

const untoggleSelectImage = (): void => {
  selectMultiple.value = false;
  imagesSelectedList.value = [];
};

// Toggle select mode function
const toggleSelectMode = (): void => {
  selectMultiple.value = !selectMultiple.value;
  if (!selectMultiple.value) {
    imagesSelectedList.value = [];
  }
};

// Delete selected images function
const deleteSelectedImages = async (): Promise<void> => {
  if (imagesSelectedList.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Please select at least one image to delete',
      life: 3000
    });
    return;
  }

  // Confirm deletion
  const confirmed = confirm(`Are you sure you want to delete ${imagesSelectedList.value.length} selected image(s)?`);
  if (!confirmed) return;

  try {
    // Delete selected images using the same endpoint as the existing function
    await axios.delete(backend.construct('gallery/images'), {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      data: {
        imagePaths: imagesSelectedList.value
      }
    });

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `${imagesSelectedList.value.length} image(s) deleted successfully`,
      life: 3000
    });

    // Refresh the gallery and reset selection
    await reloadPage();
    imagesSelectedList.value = [];
    selectMultiple.value = false;
  } catch (error) {
    console.error('Error deleting images:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete selected images',
      life: 3000
    });
  }
};

</script>

<style scoped>
/* Estilos modernos con transiciones */
.transform-gpu {
  transform: translateZ(0);
}
</style>
