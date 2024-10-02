import React from "react";


function Media({name , icon}){
    return(
        <Tooltip content={name}>
            <div>
                <img src={icon} alt={name} />
            </div>
        </Tooltip>
    )
}

export default Media;