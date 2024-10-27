
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Result() {
    const [partyData, setPartyData] = useState([]);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/party/')
            .then(response => response.json())
            .then(data => {
                setPartyData(data);

                // Determine the winner based on total votes
                let max = 0;
                let winner = '';
                data.forEach( (element , index) => {
                    if(element.totalVote > max){
                        max = element.totalVote;
                        winner = element.name;
                        setWinner(winner);
                    }
                    else if(element.totalVote === max){
                        setWinner('');
                    }
                })
            });
    }, []);

    // setWinner(findWinner(partyData));
    

    return (
        <main 
            className="h-screen w-screen flex flex-col items-center justify-around bg-gray-800 text-white"
        >
            {/* Heading section */}
            <section className="text-2xl font-bold mb-4 text-white bg-orange-500 p-4 rounded-lg shadow-md shadow-white">
                Results Are Here
            </section>

            {/* Winner section */}
            <section className="text-xl mb-4 p-3 bg-blue-600 rounded-xl cursor-pointer">
                {winner ? `${winner} Wins!` : "No winner determined."}
            </section>

            {/* Party Vote count section */}
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10 cursor-pointer">
                {partyData.map((party, index) => (
                    <div 
                        key={index} 
                        className="relative flex flex-col items-center w-44 h-44 p-4 border rounded-lg shadow-md bg-white "
                    >
                        <img 
                            src={party.logo} alt={`${party.name} logo`} 
                            className="h-1/2 w-1/2 mb-2" 
                        />
                        
                        <h2 className="text-lg font-semibold text-blue-600">{party.name}</h2>
                        <div 
                            className="absolute -bottom-[20px] box-border h-10 w-10 p-2 text-white text-center text-lg md:text-xl bg-orange-500 rounded-full"
                        >
                            {party.totalVote}
                        </div>
                    </div>
                ))}
            </section>

            {/* Return section */}
            <section className="mt-4">
                <button className="p-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xl shadow-lg shadow-white">
                    <Link to='/hero'>
                        Go back
                    </Link>
                </button>
            </section>
        </main>
    );
}

export default Result;