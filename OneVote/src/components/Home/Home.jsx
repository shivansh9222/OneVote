import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Card from './Card/Card';
import { useContext, useEffect, useState } from 'react';

function Home() {
    const [partyData , setPartyData] = useState([]);
    const navigate = useNavigate();
    const {user , isLoggedIn , setUser , setIsLoggedIn} = useContext(UserContext);

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
                alert('Token Expired.');
                localStorage.removeItem('token');
                navigate('/registeration'); 
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            navigate('/registeration');
        }
        
    };

    const handleVote = async (cardId) => {
        const token = localStorage.getItem('token');

        if(!isLoggedIn){
            return alert("Please login to vote");
        }
        let data;
        try {
            const response = await fetch('http://localhost:8000/api/updatevote/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ partyId: cardId }),
            });
    
            data = await response.json();
            if (response.ok) {
                const now = new Date();
                setUser( (prev) => ({
                    ...prev,
                    has_voted: true,
                    voted_at: now.toLocaleDateString()
                }))
                alert('Thank You for voting.');
            } else {
                alert(data.error || 'Failed To Vote');
            }
        } catch (error) {
            if(data.status === 404) return alert(data.error)
            if (data.status === 500) return alert(data.error)
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
