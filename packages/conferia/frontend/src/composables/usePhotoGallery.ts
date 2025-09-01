import { inject } from 'vue';
import { axiosKey } from '#/plugins/symbols';

export const usePhotoGallery = () => {
  const axios = inject(axiosKey)!;

  /**
   * Check if we're in a mobile environment and getUserMedia is available
   */
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  /**
   * Check if camera is available
   */
  const isCameraAvailable = (): boolean => {
    return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
  };

  const getImageUrl = (filepath: string): string => {
    return axios.getUri({
      url: `gallery/images/${filepath}`,
      params: { format: 'webp' }
    });
  };

  const getImageJPG = (filepath: string): string => {
    return axios.getUri({
      url: `gallery/images/${filepath}`,
      params: { format: 'jpg' }
    });
  };

  /**
   * Process and compress image with better quality settings
   */
  const processImage = async (imageBlob: Blob, maxSize: number, maxHeight: number, maxWidth: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const scale = Math.min(maxWidth / width, maxHeight / height);

        // Only scales if the image is larger than given max sizes
        if (scale < 1) {
          width *= scale;
          height *= scale;
        }
        canvas.width = width;
        canvas.height = height;

        const convertedMaxSize = maxSize * 1024 * 1024;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Enable high-quality image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
        }

        let quality = 1; // Start with 95% quality instead of 100%
        const step = 0.05; // Reduce quality by 5% each step (more gradual)
        const minQuality = 0.8; // Don't go below 80% quality (was 60%)

        const reduceQualityParameter = () => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to convert canvas to blob'));
              return;
            }
            if (blob.size <= convertedMaxSize || quality <= minQuality) {
              resolve(blob);
            } else {
              quality -= step;
              reduceQualityParameter();
            }
          }, 'image/jpeg', quality);
        };
        reduceQualityParameter();
      };
      img.onerror = () => {
        reject(new Error('Image load error'));
      };

      img.src = URL.createObjectURL(imageBlob);
    });
  };

  /**
   * Take photo using device camera with getUserMedia API
   */
  const takePhotoWithCamera = async (): Promise<Blob> => {
    if (!isCameraAvailable()) {
      throw new Error('Camera not available on this device');
    }

    return new Promise((resolve, reject) => {
      // Create video element to show camera preview
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Create a modal-like container for the camera
      const cameraContainer = document.createElement('div');
      cameraContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `;

      video.style.cssText = `
        max-width: 90%;
        max-height: 70%;
        border-radius: 8px;
      `;

      const buttonContainer = document.createElement('div');
      buttonContainer.style.cssText = `
        margin-top: 20px;
        display: flex;
        gap: 15px;
      `;

      const captureButton = document.createElement('button');
      captureButton.innerHTML = '📷 Tomar Foto';
      captureButton.style.cssText = `
        padding: 12px 24px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      `;

      const cancelButton = document.createElement('button');
      cancelButton.innerHTML = '❌ Cancelar';
      cancelButton.style.cssText = `
        padding: 12px 24px;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      `;

      buttonContainer.appendChild(captureButton);
      buttonContainer.appendChild(cancelButton);
      cameraContainer.appendChild(video);
      cameraContainer.appendChild(buttonContainer);
      document.body.appendChild(cameraContainer);

      // Get user media
      const setupCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1920, min: 1280 }, // Higher resolution for better quality
              height: { ideal: 1080, min: 720 },
              facingMode: 'user' // Front camera for profile photos
            }
          });

          video.srcObject = stream;
          video.autoplay = true;
          video.playsInline = true;

          const stopCamera = () => {
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(cameraContainer);
          };

          captureButton.onclick = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Use high-quality canvas rendering
            if (context) {
              context.imageSmoothingEnabled = true;
              context.imageSmoothingQuality = 'high';
              context.drawImage(video, 0, 0);
            }

            // Increased JPEG quality from 0.9 to 0.95 for better camera captures
            canvas.toBlob((blob) => {
              if (blob) {
                stopCamera();
                resolve(blob);
              } else {
                stopCamera();
                reject(new Error('Failed to capture photo'));
              }
            }, 'image/jpeg', 0.95);
          };

          cancelButton.onclick = () => {
            stopCamera();
            reject(new Error('Camera capture cancelled'));
          };
        } catch (error: unknown) {
          document.body.removeChild(cameraContainer);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          reject(new Error(`Camera access denied: ${errorMessage}`));
        }
      };

      void setupCamera();
    });
  };

  /**
   * Fallback: Use file input to simulate camera
   */
  const takePhotoWithFileInput = async (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment'; // This hints to use camera on mobile

      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          resolve(file);
        } else {
          reject(new Error('No photo was taken'));
        }
      };

      input.oncancel = () => {
        reject(new Error('Photo capture was cancelled'));
      };

      input.click();
    });
  };

  /**
   * Take photo for gallery (higher quality, less compression)
   */
  const takePhotoGallery = async (): Promise<Blob> => {
    try {
      let photoBlob: Blob;

      if (isCameraAvailable() && isMobileDevice()) {
        photoBlob = await takePhotoWithCamera();
      } else {
        photoBlob = await takePhotoWithFileInput();
      }

      // Increased size limit to 3MB and dimensions to 2400x2400 for better gallery quality
      return await processImage(photoBlob, 3, 2400, 2400);
    } catch (e) {
      throw new Error(`Failed to take photo: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  };

  /**
   * Take photo for profile (smaller, but still good quality)
   */
  const takePhotoProfile = async (): Promise<Blob> => {
    try {
      let photoBlob: Blob;

      if (isCameraAvailable() && isMobileDevice()) {
        photoBlob = await takePhotoWithCamera();
      } else {
        photoBlob = await takePhotoWithFileInput();
      }

      // Increased size limit from 0.2MB to 1MB for better profile photo quality
      return await processImage(photoBlob, 1, 800, 600);
    } catch (e) {
      throw new Error(`Failed to take profile photo: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  };

  /**
   * Choose photo from gallery/device
   */
  const choosePhotoFromPhone = async (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          resolve(file);
        } else {
          reject(new Error('No file was selected'));
        }
      };

      input.oncancel = () => {
        reject(new Error('File selection was cancelled'));
      };

      input.click();
    });
  };

  return {
    takePhotoGallery,
    takePhotoProfile,
    choosePhotoFromPhone,
    getImageUrl,
    getImageJPG,
    getImageWebP: getImageUrl
  };
};

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
