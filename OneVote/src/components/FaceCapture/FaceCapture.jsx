import React, { useRef } from 'react';
import Webcam from 'react-webcam';

function FaceCapture({ endpoint, onCaptureSuccess, onCaptureError }) {
    const webcamRef = useRef(null);

    const captureImage = async () => {
        const imageSrc = webcamRef.current.getScreenshot(); // Capture image as base64
        if (!imageSrc) {
            alert("Failed to capture image");
            return;
        }

        // Send the image to the backend
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageSrc }),
            });

            const data = await response.json();
            if (data.success) {
                onCaptureSuccess(data.message); // Handle success (e.g., navigate, display message)
            } else {
                onCaptureError(data.error); // Handle error message
            }
        } catch (error) {
            onCaptureError("An error occurred while capturing image.");
        }
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
