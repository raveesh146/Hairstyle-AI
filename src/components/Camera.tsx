import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon } from 'lucide-react';
import { useStore } from '../store/useStore';

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user"
};

export function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const setUserPhoto = useStore((state) => state.setUserPhoto);

const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUserPhoto({
        imageUrl: imageSrc,
        timestamp: Date.now(),
      });
    }
  }, [setUserPhoto]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="w-full rounded-lg shadow-lg"
        mirrored={true}
      />
      <button
        onClick={capture}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 rounded-full p-4 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <CameraIcon className="w-6 h-6" />
      </button>
    </div>
  );
}