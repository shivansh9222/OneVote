import React, { useState } from 'react';

function Tooltip({ content, children }) {
    const [isVisible, setVisibility] = useState(false);

    const handleMouseOver = () => {
    setVisibility(true);
    };

    const handleMouseOut = () => {
    setVisibility(false);
    };

    return (
    <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className='relative'
    >
        {children}
        {isVisible && (
        <div 
            className="tooltip border-[2px] border-transparent bg-gray-600 text-white ubuntu-light-italic px-1 text-sm absolute bottom-[-8px] left-0 cursor-pointer z-10 transition-all ease-in-out duration-300"
        >
            {content}
        </div>
        )}
    </div>
    )
}

export default Tooltip;