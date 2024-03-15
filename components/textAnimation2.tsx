import React from 'react';
interface TextAnimation2 {
    text?: string;
    size?:string;
    weight?:string;
}

export default  function TextAnimation2({text,size,weight}:TextAnimation2) {
    return (
            <div className={`content ${size} ${weight}`}>
                <h2>{text}</h2>
                <h2>{text}</h2>
            </div>

    );
}

