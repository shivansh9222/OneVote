import React from "react";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";

function Media({name , icon , takeTo}){
    return(
        <Tooltip content={name}>
            <div className="mb-4 hover:scale-140">
                <Link to={takeTo}>
                    <img src={icon} alt={name} className="h-6 w-6 md:h-7 md:w-7 "/>
                </Link>
                
            </div>
        </Tooltip>
    )
}

export default Media;