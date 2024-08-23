import React, { useState, useEffect } from "react";
import Photo from './mediamarkt.png'

const Typewriter = ({ message, valid }) => {
    const [currentText, setCurrentText] = useState("");
    const [index, setIndex] = useState(0);
    const [link, setLink] = useState();
    const [include, setInclude] = useState();
    const [beforeLink, setBeforeLink] = useState("");
    const [afterLink, setAfterLink] = useState("");
    const [last, SetLast] = useState(false);
    // useEffect(() => {
    //     if (index < message.cevap.length) {
    //         const timer = setTimeout(() => {
    //             setCurrentText((prevText) => prevText + message.cevap[index]);
    //             setIndex((prevIndex) => prevIndex + 1);
    //         }, 100); // 100 milisaniye aralıklarla harf ekler

    //         return () => {
    //             clearTimeout(timer);
    //         };
    //     }
    // }, [index, message.cevap]);

    useEffect(() => {
        if (message.cevap.includes("https://")) {
            // const beforeLink = message.cevap.split("https://")[0];
            // setBeforeLink(message.cevap.split("https://")[0]);
            // setLink("https://" + message.cevap.split("https://")[1].split(" ")[0]);
            // setAfterLink(message.cevap.split("https://")[1].split(" ")[1]);
            if (index < message.cevap.length) {
                const timer = setTimeout(() => {
                    setBeforeLink((prevText) => prevText + message.cevap[index]);
                    setIndex((prevIndex) => prevIndex + 1);
                }, 100); // 100 milisaniye aralıklarla harf ekler


                return () => {

                    clearTimeout(timer);
                    setInclude(true)
                };

            }



        }
        else {
            if (index < message.cevap.length) {
                const timer = setTimeout(() => {
                    setCurrentText((prevText) => prevText + message.cevap[index]);
                    setIndex((prevIndex) => prevIndex + 1);
                }, 100); // 100 milisaniye aralıklarla harf ekler

                return () => {
                    clearTimeout(timer);
                };
            }
        }


    }, [link, index, message.cevap])
    if (message.type==='son') {
        return (
            <div>
                <div>
                    {!include &&
                        <div className="flex  bg-gray-200 py-2 px-4 rounded-lg ">
                            <img className="w-5 h-5 mr-2" src={Photo} alt="" />

                            <p>{currentText}</p>
                            <p className="text-xs text-gray-500 mt-1 ml-1">
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>



                        </div>

                    }
                    {include &&
                        <div>
                            <div className="flex  bg-gray-200 py-2 px-4 rounded-lg">
                                <img className="w-5 h-5 mr-2" src={Photo} alt="" />

                                <p>{beforeLink}</p>
                                {/* <a href={link} className="bg-red-150 text-white font-bold py-2 px-4 rounded-lg" target="_blank" rel="noopener noreferrer" >MediaMarkt</a> */}

                                <p className="text-xs text-gray-500 mt-1 ml-1">
                                    {new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                                {/* {beforeLink}
    
                        {last &&
                            <div>
                                <a href={link} className="bg-red-150 text-white font-bold py-2 px-4 rounded-lg" target="_blank" rel="noopener noreferrer" >MediaMarkt</a>
                                {afterLink}
    
                            </div>
    
                        } */}


                            </div>
                            <div className="flex justify-center mt-1">
                                <a href={"https://www.mediamarkt.com.tr/tr/shop/hediye-bulucu.html?utm_source=onedio&utm_medium=dis-dynamic%20ad&utm_campaign=anneai"} className="bg-red-150 text-white font-bold py-2 px-4 rounded-lg" target="_blank" rel="noopener noreferrer" >MediaMarkt</a>
                            </div>
                        </div>

                    }

                </div>


            </div>
        );
    } else {
        return (
            <div>
                <div>

                    <div>
                        <div className="flex  bg-gray-200 py-2 px-4 rounded-lg">
                            <img className="w-5 h-5 mr-2" src={Photo} alt="" />

                            <p>{currentText}</p>
                            {/* <a href={link} className="bg-red-150 text-white font-bold py-2 px-4 rounded-lg" target="_blank" rel="noopener noreferrer" >MediaMarkt</a> */}

                            <p className="text-xs text-gray-500 mt-1 ml-1">
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                            {/* {beforeLink}
    
                        {last &&
                            <div>
                                <a href={link} className="bg-red-150 text-white font-bold py-2 px-4 rounded-lg" target="_blank" rel="noopener noreferrer" >MediaMarkt</a>
                                {afterLink}
    
                            </div>
    
                        } */}


                        </div>
                        <div className="flex justify-center mt-1">
                            <a href={"https://www.mediamarkt.com.tr/tr/shop/hediye-bulucu.html?utm_source=onedio&utm_medium=dis-dynamic%20ad&utm_campaign=anneai"} className="bg-red-150 text-white font-bold py-2 px-4 rounded-lg" target="_blank" rel="noopener noreferrer" >MediaMarkt</a>
                        </div>
                    </div>


                </div>


            </div>
        );
    }


};

export default Typewriter;