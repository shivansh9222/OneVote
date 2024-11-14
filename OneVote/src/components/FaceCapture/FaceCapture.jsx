// Not being used

import React, { useRef } from 'react';
import Webcam from 'react-webcam';

function FaceCapture({ onCaptureSuccess, onCaptureError }) {
    const webcamRef = useRef(null);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot(); // Capture image as base64
        if (!imageSrc) {
            onCaptureError("Failed to capture image");
            return;
        }

        onCaptureSuccess(imageSrc); // Pass the captured image to the parent component
    };

    return (
        <div className='flex flex-wrap flex-col gap-y-1 border-[2px] border-orange-500 w-full'>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
            />
            <button
                className='rounded-full bg-orange-500 text-white mx-auto p-2 text-base mb-2 hover:bg-orange-600'
                onClick={captureImage}
            >
                Capture
            </button>
        </div>
    );
}

export default FaceCapture;