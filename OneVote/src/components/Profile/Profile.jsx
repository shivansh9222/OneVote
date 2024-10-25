import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const {user , setUser , isLoggedIn , setIsLoggedIn} = useContext(UserContext);

    const handleLogout = () => {
        if(!isLoggedIn){
            return alert('user not found.')
        }
        fetch('http://localhost:8000/api/logout/', {
            method: 'POST', // Change GET to POST or DELETE as needed
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return alert('failed to logout')
            } else{
                setUser({});
                setIsLoggedIn(false);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            navigate('/registeration');
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <>
            <main 
                className="w-[80vw] md:max-w-[300px] h-max my-12 mx-auto  flex flex-col bg-orange-400 text-white p-2 md:p-4 shadow shadow-gray-500 rounded-lg"
            >
                <h1 className="text-lg md:text-xl ubuntu-medium-italic mb-0 text-center">Profile</h1>
                <div className="w-[70%] border-[2px] border-white mb-3 mt-1 mx-auto"></div>
                <div>Unique Id:{user.uniqueId} </div>
                <div>Voted: </div>
                <button 
                    onClick={handleLogout}
                    className="bg-white p-2 my-2 text-orange-500 w-max mx-auto rounded-[20px] hover:rounded-[13px] transition-all ease-in-out duration-150 text-sm md:text-base"
                >Logout</button>
            </main>
        </>
    )
}

export default Profile;