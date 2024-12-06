import { CanvasError } from './errors';
import type { ImageDimensions } from './imageLoader';

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const createCanvas = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new CanvasError('Failed to get canvas context');
  }
  return ctx;
};

export const drawImageOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  position?: Position
) => {
  try {
    if (position) {
      ctx.drawImage(image, position.x, position.y, position.width, position.height);
    } else {
      ctx.drawImage(image, 0, 0);
    }
  } catch (error) {
    throw new CanvasError('Failed to draw image on canvas');
  }
};

export const calculateHairstylePosition = (
  facePrediction: any,
  baseDimensions: ImageDimensions,
  overlayDimensions: ImageDimensions
): Position => {
  const faceWidth = facePrediction.bottomRight[0] - facePrediction.topLeft[0];
  const scale = (faceWidth * 2) / overlayDimensions.width;
  
  const width = overlayDimensions.width * scale;
  const height = overlayDimensions.height * scale;
  
  const x = facePrediction.topLeft[0] - (width - faceWidth) / 2;
  const y = facePrediction.topLeft[1] - height * 0.7;
  
  return { x, y, width, height };
};