import { Link } from "react-router-dom";
import './Card.css'

function Card({name , logo, description, manifestoLink , onVote}){
    return (
        <main 
            className="cardContainer flex mb-4"
            
        >
            <div className="card">
                <div className="theFront p-2">
                    <div className="w-full h-full flex items-center justify-center p-2 box-border border-[3px] border-orange-500 rounded-lg ">
                        <img 
                            src={logo} 
                            alt="logo" 
                            className="h-full w-full"
                        />
                    </div>
                </div>
                <div 
                    className="theBack flex flex-col items-center justify-around p-2 gap-y-10 bg-orange-400 text-white"
                >
                    <h1 className="text-2xl ubuntu-medium-italic">
                        {name}
                    </h1>
                    <p 
                        className="text-center text-white ubuntu-medium-italic"
                    >
                        {description}
                    </p>
                    <Link 
                        to={manifestoLink}
                        className="text-blue-500 underline ubuntu-light-italic hover:text-blue-700"
                    >
                        Menifesto
                    </Link>
                    <button 
                        className="text-orange-500 bg-white hover:bg-gray-600 hover:text-white ubuntu-medium-italic p-2 rounded-lg shadow-md transition-all ease-in-out duration-200" 
                        onClick={onVote}
                    >
                        Vote
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Card;