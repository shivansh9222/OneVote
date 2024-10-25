import UserContext from '../../context/UserContext';
import Card from './Card/Card';
// import Parties from '../../assests/partyData';
import { useContext, useEffect, useState } from 'react';

function Home() {
    const [partyData , setPartyData] = useState([]);

    const {user , isLoggedIn , setUser , setIsLoggedIn} = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if token is absent
        } else {
          // Call an API to verify the token and load user data if necessary
          fetchUserData();
        }
      }, [navigate]);


    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/protected_view/', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the request headers
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User authenticated:', data);
        } else {
            console.log('User not authenticated or token expired');
            localStorage.removeItem('token');
            navigate('/registeration'); // Redirect to login if token is invalid
        }
    };

    // const getCsrfToken = () => {
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i].trim();
    //         if (cookie.startsWith('csrftoken=')) {
    //             return cookie.split('=')[1];
    //         }
    //     }
    //     return null;
    // };

    // const fetchCsrfToken = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
    //             method: 'GET',
    //             credentials: 'include'  // Important for including cookies
    //         });
    //         const data = await response.json();
    //         return data.csrfToken;  // Extract the CSRF token from the response
    //     } catch (error) {
    //         console.error('Error fetching CSRF token:', error);
    //         return null;
    //     }
    // };

    // const getCsrfToken = () => {
    //     const name = 'csrftoken';
    //     const cookieValue = document.cookie
    //         .split('; ')
    //         .find(row => row.startsWith(name))
    //         ?.split('=')[1];
        
    //     console.log('CSRF Token:', cookieValue); // Log CSRF token
    //     return cookieValue;
    // };
    
    // console.log('fetch:',fetchCsrfToken());
    // console.log('get:',getCsrfToken());
    // console.log(fetchCsrfToken())
    

    const handleVote = async (cardId) => {

        if(!isLoggedIn){
            return alert("Please login to vote");
        }
        console.log(isLoggedIn);
        
        try {
            const response = await fetch('http://localhost:8000/api/updatevote/' , {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({partyId: cardId})
            })

            const data = await response.json();
            if(data.status === 'success'){
                alert('Vote casted successfully');
            }
            else{
                alert('Failed To Vote');
            }
        } catch (error) {
            console.log(error);
        }
        
        // fetch('http://localhost:8000/api/updatevote/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'X-CSRFToken': csrfToken,
        //     },
        //     // credentials: 'include',
        //     body: JSON.stringify({partyId: cardId })
        // })
        // .then((response) => {
        //     console.log(response);
        //     if(response.ok){
        //         alert('vote successfully added');
        //     } else{
        //         alert('Failed to add vote');
        //     }
            // if (response.status === 403) {
            //     throw new Error('CSRF token missing or incorrect');
            // }
            // return response.json();
            // if (response.ok) {
            //     return response.json();
            // } else {
            //     return response.json().then(err => {
            //         throw new Error(err.error);
            //     });
            // }
        // })
        // .then(data => {
        //     console.log('Vote successful:', data);
        // })
        // .catch(error => {
        //     console.log('Error:', error);
        // });
        // .then(data => {
        //     alert('Vote added successfully');
        //     console.log('Response data:', data);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('Error voting: ' + error);
        // });

        /*
        for (let i = 0; i < partyData.length; i++) {
            if (partyData[i].party_id === cardId) {
                partyData[i].totalVote += 1;
    
                // Send the updated total votes to the backend
                fetch(`http://localhost:8000/api/party/${cardId}/`, {
                    method: 'PUT', // or 'PATCH' depending on your API design
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ totalVote: partyData[i].totalVote }), // Send the updated vote count
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Vote updated successfully:', data);
                })
                .catch(error => {
                    alert('There was a problem with the fetch operation:', error);
                });
    
                break;
            }
        }
        */
    };

    //fetching all the card data for creating party cards.
    useEffect( () => {
        fetch('http://localhost:8000/api/party/')
        .then( response => response.json())
        .then( data => setPartyData(data));
    } , [])

        return(
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
        );
    
    
    
}

export default Home;
