import Card from './Card/Card';
import Parties from '../../assests/partyData';
function Home() {

    const handleVote = (cardId) => {
        for(let i = 0; i<Parties.length; i++){
            if(Parties[i].id === cardId){
                Parties[i].totalVote += 1;
                break;
            }
        }
    }
    return(
        <main 
            className='w-full grid grid-cols-1 gap-5 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
            {
                Parties.map((party,index)=>{
                    return(
                        <div key={index}>
                            <Card 
                                name={party.name}
                                logo={party.logo}
                                description={party.description}
                                manifestoLink={party.manifestoLink}
                                onVote={() => {
                                    handleVote(party.id);
                                    console.log(party.name , ":",party.totalVote);
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
