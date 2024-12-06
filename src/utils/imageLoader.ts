import { ImageLoadError } from './errors';

export interface ImageDimensions {
  width: number;
  height: number;
}

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new ImageLoadError('Failed to load image'));
    
    // Handle CORS and data URLs appropriately
    if (src.startsWith('data:')) {
      img.src = src;
    } else {
      // Use a CORS proxy for external URLs
      const corsUrl = new URL(src);
      corsUrl.searchParams.set('fit', 'crop');
      corsUrl.searchParams.set('auto', 'format');
      img.src = `https://cors.stackblitz.io/${corsUrl.toString()}`;
    }
  });
};