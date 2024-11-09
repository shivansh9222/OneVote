import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Card from './Card/Card';
import { useContext, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import FaceCaptureModal from '../Modal/FaceCaptureModal';

function Home() {
    const [partyData , setPartyData] = useState([]);
    const navigate = useNavigate();
    const {user , isLoggedIn , setUser , setIsLoggedIn} = useContext(UserContext);

    // Modal section starts here.
    const [showModal , setShowModal] = useState(false);
    const [modalMessage , setModalMessage] = useState('');
    const [modalLink, setModalLink] = useState('');
    const [path , setPath] = useState('');

    const closeModal = () => {
        setShowModal(false);
        setisOpenFace(false);
        navigate(path);
    }
    // Modal section ends here


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/registeration'); 
          // Redirect to login if token is absent
        } else {
          // Call an API to verify the token and load user data if necessary
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
                setModalMessage('Token Expired')
                setPath('/registeration')
                setShowModal(true)
                // <Modal isOpen={showModal} closeModal={closeModal} link={sessionExpired} message={'Token Expired'}/>
                // alert('Token Expired.');
                
                // navigate('/registeration'); 
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            navigate('/registeration');
        }
        
    };


    // Face modal sections starts here
    const [isFaceVerified, setisFaceVerified] = useState( () => {
        const storedFaceVerified = localStorage.getItem('faceVerified');
        return storedFaceVerified === 'true' ? true : false;
    })
    const [isOpenFace, setisOpenFace] = useState(false)

    const [faceVerificationInProgress, setFaceVerificationInProgress] = useState(false);
    const [pendingVoteCardId, setPendingVoteCardId] = useState(null);

    const closeFaceModal = () => {
        setisOpenFace(false)
    }

    const onCaptureError = (error) => {
        setModalMessage(error);
        setShowModal(true);
        setisOpenFace(false);
    }

    const onCaptureSuccess = (image) => {
        // setModalMessage('Face captured successfully');
        // setShowModal(true);
        verifyFace(image);
    }

    const verifyFace =async (capturedImage) => {
        const token = localStorage.getItem('token');
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
            if(response.ok){
                setisFaceVerified(true);
                localStorage.setItem('faceVerified', 'true');
                setModalMessage(data.message);
                setShowModal(true);

                if (pendingVoteCardId) {
                    castVote(pendingVoteCardId); 
                    // Call castVote after successful face verification
                }

            } else{
                setModalMessage('face do not match');
                setShowModal(true);
            }
        } catch (error) {
            setModalMessage('Server error')
            setShowModal(true);
            console.error(error);
        }
    }
    // Face modal sections ends here


    const handleVote = async (cardId) => {
        if (!isLoggedIn) {
            setModalMessage("Please login to vote");
            setPath('/registeration');
            setShowModal(true);
            return;
        }
        
        if (!isFaceVerified) {
            setisOpenFace(true);
            setPendingVoteCardId(cardId); 
            return;
        }

        // Directly cast vote if face is already verified
        castVote(cardId);
    }

    const castVote = async (cardId) => {
        const token = localStorage.getItem('token');

        // //Face verification section starts here
        // setisOpenFace(true);
        // // if()
        // if(!isFaceVerified){
        //     alert('face not verified')
        //     return;
        // }
        // //Face verification section ends here

        // if(!isLoggedIn){
        //         setModalMessage("Please login to vote")
        //         setPath('/registeration')
        //         setShowModal(true)
        //     // return alert("Please login to vote");
        // }
        // let data;
        try {
            const response = await fetch('http://localhost:8000/api/updatevote/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ partyId: cardId }),
            });
    
            const data = await response.json();
            if (response.ok) {
                const now = new Date();
                setUser( (prev) => ({
                    ...prev,
                    has_voted: true,
                    voted_at: now.toLocaleDateString()
                }))
                setModalMessage('Thank You for voting.')
                setModalLink('/home')
                setShowModal(true)
            } else {
                setModalMessage(data.error || 'Failed To Vote')
                // setModalLink(voteSuccessfulurl)
                setModalLink('/home')
                setShowModal(true)
                // alert();
            }
        } catch (error) {
            // if(data.status === 404) return alert(data.error)
            // if (data.status === 500) return alert(data.error)
            console.log('Error casting vote:', error);
        }
    };

    //fetching all the card data for creating party cards.
    useEffect( () => {
        fetch('http://localhost:8000/api/party/')
        .then( response => response.json())
        .then( data => setPartyData(data));
    } , [])

        return(
            <>
                {/* Modal Component */}
                <Modal 
                    isOpen={showModal} 
                    closeModal={closeModal} 
                    message={modalMessage}
                    link={modalLink}
                />

                {/* Face Capture modal section starts here */}
                <FaceCaptureModal 
                    isOpenFace={isOpenFace}
                    closeFaceModal={closeFaceModal}
                    onCaptureError={onCaptureError}
                    onCaptureSuccess={onCaptureSuccess}
                />
                {/* Face Capture modal section ends here */}



                <main 
                    className='w-full h-max grid grid-cols-1 gap-5 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                >
                    {
                        partyData.map((party,index)=>{
                            return(
                                <div key={index}>
                                    <Card 
                                        name={party.name}
                                        logo={party.logo}
                                        description={party.description}
                                        manifestoLink={party.manifestoLink}
                                        onVote={() => {
                                            handleVote(party.party_id);
                                        }}
                                    />
                                </div>
                            )
                        })
                    }
                </main>
            </>
            
        );
    
    
    
}

export default Home;
