import React, { useContext , useEffect , useState } from "react";
import UserContext from '../../context/UserContext'
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Modal from "../Modal/Modal";
import { apiUrl } from "..";


function Profile() {
    const navigate = useNavigate();

    const [loading , setLoading] = useState(false)
    const {user , isLoggedIn , setUser , setIsLoggedIn} = useContext(UserContext);
    useAuth();

    // Modal section starts here.
    const [showModal , setShowModal] = useState(false);
    const [modalMessage , setModalMessage] = useState('');
    const [modalLink, setModalLink] = useState('');
    const [path , setPath] = useState('');

    const closeModal = () => {
        setShowModal(false);
        navigate(path);
    }
    // Modal section ends here

    const handleLogout = () => {

        setLoading(true)
        if(!isLoggedIn){
            setModalMessage('user not found.')
            setPath('/registeration')
            setShowModal(true)
        }
        fetch(`${apiUrl}/api/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                setModalMessage('Session has expired. Please Login again.')
                setPath('/registeration')
                setShowModal(true)
            } 
            else{
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('isLoggedIn');
            }
            return response.json();
        })
        .then(data => {
            setModalMessage(data.message)
            setLoading(false);
            setPath('/hero')
            setShowModal(true);
        })
        .catch(error => {
            console.log(error);
        })
    }

    let dp = 'https://i.pinimg.com/564x/ee/c7/bd/eec7bd947d4c797c41010a273dcd50ba.jpg';

    return (
        <>
            {/* Modal Component */}
            <Modal 
                isOpen={showModal} 
                closeModal={closeModal} 
                message={modalMessage}
                link={modalLink}
            />

            <main 
                className="max-w-sm mx-auto my-12 py-6 bg-orange-50 rounded-lg shadow-xl flex flex-col items-center justify-between"
            >
                <div className="flex flex-col items-center">

                    {/* image section starts here */}
                    <img 
                        // Placeholder for profile picture
                        src={user.profilePicture || dp} 
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-orange-400 mb-4 object-cover object-center"
                    />
                    {/* Image section ends here */}

                    {/* heading section starts here */}
                    <h1 
                        className="text-2xl font-bold text-orange-600 mb-2"
                    >
                        Profile
                    </h1>
                    <div className="w-full border-b-2 border-gray-300 mb-4"></div>
                    {/* Heading section ends here */}

                    {/* Data section starts here */}
                    <div className="text-lg text-gray-700">

                        <p>
                            <strong>
                                Unique Id : 
                            </strong>   {user.unique_id}
                        </p>

                        <p>
                            <strong>Vote Status : </strong>  {user.has_voted ? 'Voted' : 'Yet to Vote'}
                        </p>

                        {user.has_voted && 
                            (<p>
                                <strong>Voted At:</strong> {user.voted_at}
                            </p>)
                        }
                    </div>
                    {/* Data section ends here */}
                </div>
                <button 
                    onClick={handleLogout}
                    className={`mt-6 w-1/2 mx-auto text-white p-2 rounded-lg  transition duration-200
                    ${loading ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600'} cursor-pointer
                    `}
                    disabled={loading}
                >
                    {loading ? 'Loging out...' : 'Logout'}
                </button>
            </main>
        </>
    )
}

export default Profile;