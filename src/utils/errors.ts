export class ImageLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageLoadError';
  }
}

export class FaceDetectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FaceDetectionError';
  }
}

export class CanvasError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CanvasError';
  }
}