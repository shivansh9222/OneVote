import React, { useContext , useEffect } from "react";
// import UserContext from "../../context/UserContext";

import UserContext from '../../context/UserContext'
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const {user , isLoggedIn , setUser , setIsLoggedIn} = useContext(UserContext);

    // console.log('profile section: ',user);

    // useEffect(() => {
    //     console.log("User context updated:", user);
    //     console.log("isLoggedIn context updated:", isLoggedIn);
    //   }, [user, isLoggedIn]);
    

    const handleLogout = () => {
        if(!isLoggedIn){
            return alert('user not found.')
        }
        fetch('http://localhost:8000/api/logout/', {
            method: 'GET', // Change GET to POST or DELETE as needed
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
                <div>Unique Id: {user.unique_id}</div>
                <div>Vote Status : {user.has_voted ? 'Voted' : 'Yet to Vote'} </div>
                {user.has_voted ? <div>Voted At : {new Date(user.voted_at).toLocaleDateString()} </div> :''}
                <button 
                    onClick={handleLogout}
                    className="bg-white p-2 my-2 text-orange-500 w-max mx-auto rounded-[20px] hover:rounded-[13px] transition-all ease-in-out duration-150 text-sm md:text-base"
                >Logout</button>
            </main>
        </>
    )
}

export default Profile;