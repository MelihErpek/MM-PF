import React, { useState, useEffect, useRef } from 'react';
import Photo from './mediamarkt.png'
import TypewriterCevap from './TypeWriterCevap'
// import TWIlkSoru from './TWIlkSoru'
import Anon from './anon.png'

import sorular from './sorular.json'
import ilksorular from './sorular2.json'

export default function Closed() {
    const [randomQuestions, setRandomQuestions] = useState([]);
    const [selected, setSelected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [ilkSoru, SetIlkSoru] = useState(false);

    const divRef = useRef(null);

    // Her render sonrası, sayfanın altına kaydırmak için scrollIntoView() yöntemini kullanır
    if (divRef.current) {
        divRef.current.scrollTop = divRef.current.scrollHeight;
    }

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [divRef.current && divRef.current.scrollHeight, /* ...diğer bağımlılıklarınız burada... */]);


    const selectQuestion = (soru, cevap) => {
        const message = {
            soru: soru,
            cevap: cevap,
            timestamp: new Date().toISOString(),
            sender: 'user',
            type: 'son'
        };
        setMessages(prevState => [...prevState, message]);
        setSelected(true);
        getRandomQuestions();
    };
    const selectQuestionIlk = (soru, cevap) => {

        const message = {
            soru: soru,
            cevap: cevap,
            timestamp: new Date().toISOString(),
            sender: 'user',
            type: 'ilk'
        };

        setMessages(prevState => [...prevState, message]);
        setSelected(true);

        getRandomQuestionsIlk();
    };
    const getRandomQuestions = () => {

        let randomIndexes = [];
        while (randomIndexes.length < 3) {
            let randomIndex = Math.floor(Math.random() * sorular.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }

        let selectedQuestions = randomIndexes.map((index) => sorular[index]);
        setRandomQuestions(selectedQuestions);
    };
    const getRandomQuestionsIlk = () => {

        let randomIndexes = [];
        while (randomIndexes.length < 4) {
            let randomIndex = Math.floor(Math.random() * sorular.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }

        let selectedQuestions = randomIndexes.map((index) => sorular[index]);
        setRandomQuestions(selectedQuestions);
        SetIlkSoru(true);
    };
    function SoruCevapKarti({ soru, cevap }) {
        return (
            <button className=" bg-gray-200 p-4 mb-4 py-2 px-4 rounded-lg mx-3 outline  outline-1 outline-red-150" onClick={() => selectQuestion(soru, cevap)}>
                {soru}
            </button>

        );
    }
    function SoruCevapKartiIlk({ soru, cevap }) {

        return (
            <button className=" bg-gray-200 p-4 mb-4 py-2 px-4 rounded-lg mx-1  outline  outline-1 outline-red-150 w-1/3" onClick={() => selectQuestionIlk(soru, cevap)}>
                {soru}
            </button>

        );
    }
    function SoruCevapListesi({ soruListesi }) {

        return (
            <div className="sm:flex sm:mt-2">
                {soruListesi.map((soru) => (
                        <SoruCevapKarti
                            key={soru.soru}
                            soru={soru.soru}
                            cevap={soru.cevap}
                        />
                ))}
            </div>
        );
    }
    function SoruCevapListesiIlk({ soruListesi }) {

        return (
            <div className="xl:flex ">
                {soruListesi.map((soru, index) => (

                    <SoruCevapKartiIlk
                        key={soru.soru}
                        soru={soru.soru}
                        cevap={soru.cevap}
                    />
                ))}
            </div>
        );
    }

    return (
        <>

            <div className="flex flex-col min-h-screen over">
                <div className="flex-grow">
                    <div className="flex justify-center mt-1 mx-1 text-white py-4 px-6  outline outline-4 outline-white" style={{ backgroundColor: "#E30614" }} >
                        <div className="text-lg font-bold  " >Anne Ai</div>
                    </div>


                    <div className="flex justify-center text-center mx-auto  ">
                        <div className=" flex text-center bg-gray-200 p-4 mb-4 py-2 px-4 rounded-lg">
                            <img className="w-5 h-5 mr-1 sm:mr-2" src={Anon} alt="" />

                            Merhaba, anneme bu anneler gününde nasıl bir hediye almalıyım ?
                        </div>
                    </div>
                    <div className="flex justify-center text-center mx-auto  ">
                        <div className=" flex text-center bg-gray-200 p-4 mb-4 py-2 px-4 rounded-lg">
                            <img className="w-5 h-5 mr-1 sm:mr-2" src={Photo} alt="" />

                            Anneni neler mutlu eder tarif eder misin?
                        </div>
                    </div>

                    <div
                        className="p-6"
                        ref={divRef}
                        style={{
                            height: "60vh",
                            overflow: "auto",
                            "@media (max-width: 768px)": {
                                height: "50vh",
                            },
                        }}
                    >
                        {selected && (
                            <>
                                {messages.map((message, index) => (
                                    <div className="">

                                        <div
                                            key={index}
                                            className={`flex flex-col items-center mb-4`}
                                        >
                                            <p>
                                                <div className="flex bg-gray-200 py-2 px-4 rounded-lg ">
                                                    <img className="w-5 h-5 mr-2" src={Anon} alt="" />

                                                    <p>{message.soru}</p>
                                                    <p className="text-xs text-gray-500 mt-1 ml-1">
                                                        {new Date(message.timestamp).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                            </p>
                                        </div>
                                        <div
                                            key={index}
                                            className={`flex flex-col items-center mb-4`}
                                        >
                                            <p>
                                                <div>
                                                    <TypewriterCevap message={message} valid={ilkSoru} />

                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                </div>

                {!ilkSoru && (
                    <div className="">
                        <div className=" text-center">
                            <SoruCevapListesiIlk soruListesi={ilksorular} />
                        </div>
                    </div>
                )}
                {ilkSoru && (
                    <div className="mx-auto ">
                        <div className=" text-center">
                            <SoruCevapListesi soruListesi={randomQuestions} />
                        </div>
                    </div>
                )}



            </div>







        </>
    )

}
