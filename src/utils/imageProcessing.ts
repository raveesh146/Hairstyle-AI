import { loadImage } from './imageLoader';
import { detectFace } from './faceDetection';
import { createCanvas, getContext, drawImageOnCanvas, calculateHairstylePosition } from './canvas';
import { ImageLoadError, FaceDetectionError, CanvasError } from './errors';

export const overlayImages = async (baseImage: string, overlayImage: string): Promise<string> => {
  try {
    // Load both images in parallel
    const [baseImg, overlayImg] = await Promise.all([
      loadImage(baseImage),
      loadImage(overlayImage)
    ]);

    // Create canvas with base image dimensions
    const canvas = createCanvas(baseImg.width, baseImg.height);
    const ctx = getContext(canvas);
    
    // Draw base image
    drawImageOnCanvas(ctx, baseImg);
    
    // Detect face in the base image
    const facePrediction = await detectFace(baseImg);
    
    // Calculate hairstyle position
    const position = calculateHairstylePosition(
      facePrediction,
      { width: baseImg.width, height: baseImg.height },
      { width: overlayImg.width, height: overlayImg.height }
    );
    
    // Draw overlay image
    drawImageOnCanvas(ctx, overlayImg, position);
    
    try {
      return canvas.toDataURL('image/jpeg', 0.9);
    } catch (error) {
      throw new CanvasError('Failed to generate output image');
    }
  } catch (error) {
    if (error instanceof ImageLoadError || 
        error instanceof FaceDetectionError || 
        error instanceof CanvasError) {
      throw error;
    }
    throw new Error('Failed to process image');
  }
};