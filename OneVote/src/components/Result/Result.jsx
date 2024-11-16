
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "..";

function Result() {
    const [partyData, setPartyData] = useState([]);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        fetch( `${apiUrl}/api/party/`)
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
            className="h-screen w-screen flex flex-col items-center justify-around bg-orange-100 text-white overflow-y-auto"
        >
            {/* Heading section starts here*/}
            <section 
                className="text-xl md:text-2xl font-bold mb-8 text-white bg-orange-500 py-4 px-6 rounded-[30px] shadow-md shadow-gray-500 min-w-[60vw] text-center cursor-pointer mt-3"
            >
                Results Are Here
            </section>
            {/* Header section ends here */}

            {/* Winner section starts here*/}
            <section className="text-xl mb-4 py-3 px-6 bg-blue-600 rounded-xl cursor-pointer">
                {winner ? `${winner} Wins!` : "No winner determined."}
            </section>
            {/* Winner section ends here */}

            {/* Party Vote count section starts here*/}
            <section 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10 cursor-pointer"
            >
                {partyData.map((party, index) => (
                    <div 
                        key={index} 
                        className="relative flex flex-col items-center w-44 h-44 p-4 border rounded-lg shadow-md bg-white "
                    >
                        <img 
                            src={party.logo} alt={`${party.name} logo`} 
                            className="h-1/2 w-1/2 mb-2" 
                        />
                        
                        <h2 className="text-lg font-semibold text-blue-600 mt-1">{party.name}</h2>
                        <div 
                            className="absolute -bottom-[20px] box-border h-10 w-10 p-2 text-white text-center text-lg md:text-xl bg-blue-600 rounded-full"
                        >
                            {party.totalVote}
                        </div>
                    </div>
                ))}
            </section>
            {/* Party Vote count section ends here*/}

            {/* Return section starts here*/}
            <section className="mt-4">
                <button className="py-2 px-4 rounded-[30px] bg-orange-500 hover:bg-orange-600 text-white text-xl shadow-lg shadow-gray-600 mt-5 sm:mt-8 mb-3">
                    <Link to='/hero'>
                        Go back
                    </Link>
                </button>
            </section>
            {/* Return section ends here */}
        </main>
    );
}

export default Result;