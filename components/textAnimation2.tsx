import React from 'react';
interface TextAnimation2 {
    text?: string;
    size?:string;
    weight?:string;
}

export default  function TextAnimation2({text,size,weight}:TextAnimation2) {
    return (
            <div className={`content ${size} ${weight}`}>
                <h3>{text}</h3>
                <h3>{text}</h3>
            </div>

    );
}

