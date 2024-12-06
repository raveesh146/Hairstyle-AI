import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { RefreshCcw } from 'lucide-react';
import { overlayImages } from '../utils/imageProcessing';
import { loadFaceDetectionModel } from '../utils/faceDetection';
import { ImageLoadError, FaceDetectionError, CanvasError } from '../utils/errors';

export function Preview() {
  const { userPhoto, selectedHairstyle, setUserPhoto } = useStore();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);


  useEffect(() => {
    let mounted = true;

    const initModel = async () => {
      try {
        setIsModelLoading(true);
        await loadFaceDetectionModel();
        if (mounted) {
          setIsModelLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error('Failed to load face detection model:', error);
        if (mounted) {
          setError('Failed to initialize face detection. Please refresh the page.');
          setIsModelLoading(false);
        }
      }
    };

    initModel();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (userPhoto && selectedHairstyle && !isModelLoading) {
      setError(null);
      setIsProcessing(true);
      
      overlayImages(userPhoto.imageUrl, selectedHairstyle.imageUrl)
        .then(setPreviewImage)
        .catch((error) => {
          console.error('Image processing error:', error);
          
          let errorMessage = 'Failed to apply hairstyle. Please try again.';
          
          if (error instanceof FaceDetectionError) {
            errorMessage = 'No face detected in the image. Please try taking another photo.';
          } else if (error instanceof ImageLoadError) {
            errorMessage = 'Failed to load images. Please try again.';
          } else if (error instanceof CanvasError) {
            errorMessage = 'Failed to generate preview. Please try again.';
          }
          
          setError(errorMessage);
          setPreviewImage(userPhoto.imageUrl);
        })
        .finally(() => setIsProcessing(false));
    } else if (userPhoto) {
      setPreviewImage(userPhoto.imageUrl);
    }
  }, [userPhoto, selectedHairstyle, isModelLoading]);

  if (!userPhoto) return null;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <img
          src={previewImage || userPhoto.imageUrl}
          alt="Your photo with hairstyle"
          className="w-full rounded-lg shadow-lg"
          crossOrigin="anonymous"
        />
        {(isProcessing || isModelLoading) && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <div className="bg-white px-4 py-2 rounded-md">
              {isModelLoading ? 'Loading AI model...' : 'Processing...'}
            </div>
          </div>
        )}
        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-100 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}
        {selectedHairstyle && !error && !isProcessing && !isModelLoading && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-md">
            <h4 className="font-semibold">{selectedHairstyle.name}</h4>
            <p className="text-sm text-gray-600">{selectedHairstyle.description}</p>
          </div>
        )}
      </div>
      <button
        onClick={() => setUserPhoto(null)}
        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
      >
        <RefreshCcw className="w-5 h-5" />
      </button>
    </div>
  );
}