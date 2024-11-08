import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

function FaceCaptureModal({ onCaptureSuccess, onCaptureError, isOpenFace, closeFaceModal, children }) {

    useEffect(() => {
        document.body.style.overflow = isOpenFace ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpenFace]);

    const webcamRef = useRef(null);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            onCaptureError("Failed to capture image");
            return;
        }
        onCaptureSuccess(imageSrc);
    };

    return (
        <>
            {children}
            {isOpenFace && (
                <main 
                    className="fixed inset-0 flex items-center justify-center z-30 transition-all duration-300 ease-in-out"
                >
                    {/* Overlay Section starts here*/}
                    <section 
                        className="fixed inset-0 backdrop-blur-sm opacity-80" 
                        onClick={closeFaceModal}
                    />
                    {/* Overlay Section ends here*/}


                    {/* Face Capture Modal starts her*/}
                    <div 
                        className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4 z-10 max-w-md w-full"
                    >
                        {/* header section starts here */}
                        <h2 className="text-xl font-semibold text-center mb-4">Capture Your Face</h2>
                        {/* header section ends here */}

                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={300}
                            className="rounded-lg border-2 border-orange-500 mb-4"
                        />

                        {/* button section starts here */}
                        <div className="flex gap-4">
                            <button
                                className="bg-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-600 transition duration-200"
                                onClick={captureImage}
                            >
                                Capture
                            </button>

                            <button
                                className="bg-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-400 transition duration-200"
                                onClick={closeFaceModal}
                            >
                                Close
                            </button>
                        </div>
                        {/* button section ends here */}
                    </div>

                </main>
            )}
        </>
    );
}

export default FaceCaptureModal;