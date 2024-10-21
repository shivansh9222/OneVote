import Card from './Card/Card';
// import Parties from '../../assests/partyData';
import { useEffect, useState } from 'react';

function Home() {
    const [partyData , setPartyData] = useState([]);

    const handleVote = (cardId) => {
        fetch('http://localhost:8000/api/updatevote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({partyId: cardId })
        })
        .then(response => {
            if(!response.status){
                alert(response.json().error)
            } else{
                alert('vote added successfully');
            }
        })
        // for (let i = 0; i < partyData.length; i++) {
        //     if (partyData[i].party_id === cardId) {
        //         partyData[i].totalVote += 1;
    
        //         // Send the updated total votes to the backend
        //         fetch(`http://localhost:8000/api/party/${cardId}/`, {
        //             method: 'PUT', // or 'PATCH' depending on your API design
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({ totalVote: partyData[i].totalVote }), // Send the updated vote count
        //         })
        //         .then(response => {
        //             if (!response.ok) {
        //                 throw new Error('Network response was not ok');
        //             }
        //             return response.json();
        //         })
        //         .then(data => {
        //             alert('Vote updated successfully:', data);
        //         })
        //         .catch(error => {
        //             alert('There was a problem with the fetch operation:', error);
        //         });
    
        //         break;
        //     }
        // }
    };

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
