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
    >
        {children}
        {isVisible && (
        <div className="tooltip">
            {content}
        </div>
        )}
    </div>
    )
}

export default Tooltip;