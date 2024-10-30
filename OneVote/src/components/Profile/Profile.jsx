import React, { useContext , useEffect , useState } from "react";
import UserContext from '../../context/UserContext'
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Modal from "../Modal/Modal";


function Profile() {
    const navigate = useNavigate();
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
        if(!isLoggedIn){
            setModalMessage('user not found.')
            setPath('/registeration')
            setShowModal(true)
            // alert('user not found.')
            // navigate('/registeration')
            // return 
        }
        fetch('http://localhost:8000/api/logout/', {
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
                // alert('Session has expired. Please Login again.')
                // navigate('/registeration')
                // return
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
            // setModalLink(loginSuccess)
            setPath('/hero')
            setShowModal(true);
            // navigate('/hero');
            // alert(data.message);
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
            {/* <main 
                className="w-[80vw] md:max-w-[300px] h-max my-12 mx-auto  flex flex-col bg-orange-400 text-white p-2 md:p-4 shadow shadow-gray-500 rounded-lg"
            >
                <h1 className="text-lg md:text-xl ubuntu-medium-italic mb-0 text-center">Profile</h1>
                <div className="w-[70%] border-[2px] border-white mb-3 mt-1 mx-auto"></div>
                <div>Unique Id: {user.unique_id}</div>
                <div>Vote Status : {user.has_voted ? 'Voted' : 'Yet to Vote'} </div>
                {user.has_voted ? <div>Voted At : {new Date(user.voted_at).toLocaleDateString()} </div> :''}
                <button 
                    onClick={handleLogout}
                    className="bg-white p-2 my-2 text-orange-500 w-max mx-auto rounded-[20px] hover:rounded-[13px] transition-all ease-in-out duration-150 text-sm md:text-base"
                >Logout</button>
            </main> */}


            <main className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <img 
                        src={user.profilePicture || dp} // Placeholder for profile picture
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-orange-400 mb-4 object-cover object-center"
                    />
                    <h1 className="text-2xl font-bold text-orange-600 mb-2">Profile</h1>
                    <div className="w-full border-b-2 border-gray-300 mb-4"></div>
                    <div className="text-lg text-gray-700">
                        <p><strong>Unique Id:</strong> {user.unique_id}</p>
                        <p><strong>Vote Status:</strong> {user.has_voted ? 'Voted' : 'Yet to Vote'}</p>
                        {user.has_voted && <p><strong>Voted At:</strong> {new Date(user.voted_at).toLocaleDateString()}</p>}
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="mt-6 w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition duration-200"
                >Logout</button>
            </main>
        </>
    )
}

export default Profile;