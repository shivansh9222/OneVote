import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Card from './Card/Card';
import { useContext, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import FaceCapture from '../FaceCapture/FaceCapture';

function Home() {
    const [partyData, setPartyData] = useState([]);
    const navigate = useNavigate();
    const { user, isLoggedIn, setUser, setIsLoggedIn } = useContext(UserContext);

    // Modal section starts here.
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalLink, setModalLink] = useState('');
    const [path, setPath] = useState('');
    const [showFaceCapture, setShowFaceCapture] = useState(false);  // State to show/hide face capture

    const closeModal = () => {
        setShowModal(false);
        navigate(path);
    }
    // Modal section ends here

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/registeration'); 
        } else {
            fetchUserData(token);
        }
    }, [navigate]);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('http://localhost:8000/api/protected_view/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // alert(data.message);
            } else {
                localStorage.removeItem('token');
                setModalMessage('Token Expired');
                setPath('/registeration');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            navigate('/registeration');
        }
    };

    const handleVote = async (cardId) => {
        const token = localStorage.getItem('token');

        if (!isLoggedIn) {
            setModalMessage("Please login to vote");
            setPath('/registeration');
            setShowModal(true);
            return;
        }

        // Trigger face capture for verification before voting
        setShowFaceCapture(true);
    };

    const verifyFaceAndVote = async (capturedImage) => {
        const token = localStorage.getItem('token');
        
        // Call the backend to verify the captured face against the registered face
        try {
            const response = await fetch('http://localhost:8000/api/verify_face/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: capturedImage }),  // Send captured image for verification
            });

            const data = await response.json();
            if (response.ok && data.face_verified) {
                // If face is verified, proceed with voting
                await submitVote();
                setShowFaceCapture(false);  // Hide face capture after successful verification
            } else {
                setModalMessage('Face verification failed.');
                setShowModal(true);
                setShowFaceCapture(false);  // Hide face capture on failure
            }
        } catch (error) {
            console.log('Error verifying face:', error);
        }
    };

    const submitVote = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8000/api/updatevote/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ partyId: selectedCardId }),  // Assuming selectedCardId is set when voting
            });

            const data = await response.json();
            if (response.ok) {
                const now = new Date();
                setUser((prev) => ({
                    ...prev,
                    has_voted: true,
                    voted_at: now.toLocaleDateString()
                }));
                setModalMessage('Thank You for voting.');
                setModalLink('/home');
                setShowModal(true);
            } else {
                setModalMessage(data.error || 'Failed To Vote');
                setModalLink('/home');
                setShowModal(true);
            }
        } catch (error) {
            console.log('Error casting vote:', error);
        }
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/party/')
            .then(response => response.json())
            .then(data => setPartyData(data));
    }, []);

    return (
        <>
            {/* Modal Component */}
            <Modal 
                isOpen={showModal} 
                closeModal={closeModal} 
                message={modalMessage}
                link={modalLink}
            />
            {showFaceCapture && (
                <FaceCapture 
                    onCaptureSuccess={verifyFaceAndVote}
                    onCaptureError={(errorMessage) => {
                        setModalMessage(errorMessage);
                        setShowModal(true);
                    }}
                />
            )}
            <main 
                className='w-full h-max grid grid-cols-1 gap-5 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            >
                {
                    partyData.map((party, index) => (
                        <div key={index}>
                            <Card 
                                name={party.name}
                                logo={party.logo}
                                description={party.description}
                                manifestoLink={party.manifestoLink}
                                onVote={() => handleVote(party.party_id)}  // Trigger vote and face capture
                            />
                        </div>
                    ))
                }
            </main>
        </>
    );
}

export default Home;
