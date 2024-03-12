import React from 'react';
interface TextAnimation1 {
    text?: string;
    size?:string;
}

export default  function TextAnimation1({text,size}:TextAnimation1) {

    return (
            <div className={`relative ${size} font-bold text-right`} >
                {
                    text?.split('').map((syl:string,idx:number)=>{
                        return (
                            <span key={idx} style={{animationDelay: `0.${idx}s`}}
                                  className="inline-block text-white animate-flip">{syl}</span>
                        )
                    })
                }
            </div>
    );
}

