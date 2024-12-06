import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import { FaceDetectionError } from './errors';

let model: blazeface.BlazeFaceModel | null = null;
let isInitializing = false;

async function initializeTensorFlow() {
  try {
    // Set backend to 'webgl' for better performance
    await tf.setBackend('webgl');
    await tf.ready();
  } catch (error) {
    console.error('TensorFlow.js initialization failed:', error);
    throw new FaceDetectionError('Failed to initialize TensorFlow.js');
  }
}

export async function loadFaceDetectionModel() {
  if (model) return model;
  
  if (isInitializing) {
    // Wait for existing initialization to complete
    await new Promise(resolve => {
      const checkModel = () => {
        if (model) resolve(model);
        else setTimeout(checkModel, 100);
      };
      checkModel();
    });
    return model;
  }

  try {
    isInitializing = true;
    await initializeTensorFlow();
    
    // Load the model with a timeout
    const modelPromise = blazeface.load();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Model loading timed out')), 30000);
    });

    model = await Promise.race([modelPromise, timeoutPromise]) as blazeface.BlazeFaceModel;
    return model;
  } catch (error) {
    console.error('Face detection model loading failed:', error);
    throw new FaceDetectionError('Failed to load face detection model');
  } finally {
    isInitializing = false;
  }
}

export async function detectFace(imageElement: HTMLImageElement) {
  try {
    const model = await loadFaceDetectionModel();
    
    // Convert image to tensor
    const tensor = tf.browser.fromPixels(imageElement);
    const predictions = await model.estimateFaces(tensor, false);
    
    // Clean up tensor to prevent memory leaks
    tensor.dispose();
    
    if (predictions.length === 0) {
      throw new FaceDetectionError('No face detected in the image');
    }

    return predictions[0];
  } catch (error) {
    if (error instanceof FaceDetectionError) {
      throw error;
    }
    throw new FaceDetectionError('Face detection failed');
  }
}