import React, { useEffect, useState, useRef } from "react";
import Typewriter from "./TypeWriter";
import Closed from "./Closed";
import kufur from "./kufur.json";
import Photo from "./mediamarkt.png";
import Anon from "./anon.png";
import axios from "axios";
function Chat() {
 
  const [voiceMessages, setVoiceMessages] = useState([
    {
      text: "Cevapları sesli olarakta almak ister misiniz?",
      timestamp: new Date().toISOString(),
      sender: "gpt",
    },
  ]);
  const [messages, setMessages] = useState([
    {
      text: "Merhaba ben Uzman Ai, sana nasıl yardımcı olabilirim ?",
      timestamp: new Date().toISOString(),
      sender: "gpt",
    },
  ]);
  const [timeoutExpired, setTimeoutExpired] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(".");
  const [live, setLive] = useState(false);
  const [tThread, setTThread] = useState(null);
  const [voice, setVoice] = useState(false);
  const [begin, setBegin] = useState(false);
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isAudioAllowed, setIsAudioAllowed] = useState(false);
  // const [counter, setCounter] = useState(
  //   parseInt(localStorage.getItem("counter"))
  // );
  const divRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const turkishHour = currentHour; // UTC+3
  // const isVisible = (turkishHour >= 8 && turkishHour < 14) || (((turkishHour >= 17 && (turkishHour >= 17 && currentMinutes >= 30)) && (turkishHour <= 21 && (turkishHour <= 21 && currentMinutes <= 30))));
  // const isVisible = (turkishHour >= 8 && turkishHour < 14) || ((turkishHour >= 17 && (turkishHour <= 21 && (turkishHour <= 21 && currentMinutes <= 30))));
  //  const isVisible =  (turkishHour >= 20 && turkishHour <=24);
  const isVisible = true;
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [lastClicked, setLastClicked] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);
  const togglePopupTerms = () => {
    setIsOpenTerms(!isOpenTerms);
  };
  const handleScroll = () => {
    if (!divRef.current) return;

    const isScrolledToBottom =
      divRef.current.scrollHeight - divRef.current.scrollTop ===
      divRef.current.clientHeight;
    setIsAtBottom(isScrolledToBottom);
  };

  const fetchData = async () => {
    if (tThread !== null) {
      // console.log("Session Süresi Güncellendi", "Thread ID :" + tThread);
      const endTime = Date.now();
      const end = false;
      const duration = (endTime - sessionStart) / 1000;
      await axios.post("https://pf-api.vercel.app/sessionClosed", {
        tThread,
        duration,
        end,
        voice
      });
    }
  };
  const voiceValidation = async (param) => {
    setVoice(param);
    setBegin(true);
  };

  useEffect(() => {
    // setInterval kullanarak fetchData fonksiyonunu periyodik olarak çağır
    const interval = setInterval(fetchData, 25000); // 5 dakika = 300,000 milisaniye

    // Komponent temizlendiğinde interval'ı temizle
    return () => clearInterval(interval);
  }, [tThread]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (divRef.current && isAtBottom) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    if (lastClicked > 0) {
      const timer = setTimeout(async () => {
        const end = true;
        const endTime = Date.now();
        const duration = (endTime - sessionStart) / 1000;
        // console.log(duration);
        // console.log(tThread);
        // console.log("Session Time Out oldu.")
        await axios.post("https://pf-api.vercel.app/sessionClosed", {
          duration,
          tThread,
          end,
        });
      }, 300000); // 10 saniye sonra setShowName'i true yapar
      // Eğer butona tekrar tıklanırsa, mevcut zamanlayıcıyı sıfırla
      return () => clearTimeout(timer);
    }
  }, [lastClicked, tThread]);
  

  useEffect(() => {
    if (!isVisible) {
      setLive(true);
    } else {
      setLive(false);
    }
  }, []);

 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") {
          return ".";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    bogusCheck(inputValue);
  }, [inputValue]);
  useEffect(() => {
    inputCheck(inputValue);
  }, [inputValue]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setCounter((counter) => counter + 1);
    setLastClicked(Date.now());
    if (sessionStart === null) {
      setSessionStart(Date.now());
      // console.log("session başladı");
    }
    const messageInput = e.target.elements.message;
    const message = {
      text: messageInput.value.trim(),
      timestamp: new Date().toISOString(),
      sender: "user",
    };
    setMessages((prevState) => [...prevState, message]);
    messageInput.value = "";
    messageAPIdeneme(message.text);
  };

  
  useEffect(() => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Auto-play was prevented:", error);
        });
      }
    }
  }, [audioUrl]);
  const messageAPIdeneme = async (message) => {
    setLoading(true);
    const startTime = new Date();
    
    if (tThread === null) {
      const response = await axios.post("https://pf-api.vercel.app/message", {
        message,
        voice,
      });
      const abc = response.data.message;

      // const voice = await axios.post("http://localhost:5000/api/get-audio", {
      if (voice) {
        const voice2 = await axios.post(
          "https://pf-api.vercel.app/api/get-audio",
          {
            abc,
          }
        );
        setAudioUrl(voice2.data.url);
      }

      
      setMessages((prevState) => [
        ...prevState,
        {
          text: response.data.message,
          timestamp: new Date().toISOString(),
          sender: "gpt",
        },
      ]);
      setTThread(response.data.thread_id);
      setLoading(false);
      setTimeoutExpired(false);
         } else {
      const response = await axios.post("https://pf-api.vercel.app/message2", {
        tThread,
        message,
        voice,
      });
      const abc = response.data.message;

      if (voice) {
        const voice2 = await axios.post(
          "https://pf-api.vercel.app/api/get-audio",
          {
            abc,
          }
        );
        setAudioUrl(voice2.data.url);
      }
      

      setMessages((prevState) => [
        ...prevState,
        {
          text: response.data.message,
          timestamp: new Date().toISOString(),
          sender: "gpt",
        },
      ]);
      setLoading(false);
      setTimeoutExpired(false);
      // }
    }

    
  };
  const inputCheck = (text) => {
    if (text.length === 0) {
      setChecked(false);
    }
  };
  const bogusCheck = (text) => {
    const kelimeler = text.split(" ");
    const foundSwears = kelimeler.filter((kelime) =>
      kufur.includes(kelime.toLowerCase())
    );

    if (foundSwears.length > 0) {
      setChecked(false);
    } else {
      setChecked(true);
    }
    if (text.length === 0) {
      setChecked(false);
    }
  };
  const Loading = () => {
    if (loading === true) {
      return (
        <div className="flex-1 overflow-y-auto ">
          <div className="flex flex-col items-start">
            <p
              className={`bg-gray-200 py-2 px-4 rounded-lg inline-block rounded-bl-none`}
            >
              {dots}
            </p>
          </div>
        </div>
      );
    }
  };
  const TimeOut = () => {
    if (timeoutExpired === true) {
      return (
        <div className="flex-1 overflow-y-auto mt-1 ">
          <div className="flex flex-col items-start">
            <p
              className={`bg-gray-300 py-2 px-4 rounded-lg inline-block rounded-bl-none`}
            >
              Cevabınızı hazırlıyorum. Lütfen bekleyiniz.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-screen text-xs flex flex-col h-screen ">
      <div
        className="flex justify-center mt-1 mx-1 text-white py-4 px-6  outline outline-4 outline-white "
        style={{ backgroundColor: "#DF0000" }}
      >
        <div className="text-lg font-bold ">Uzman Ai</div>
      </div>
      <main
        className="flex-1 overflow-y-auto p-6 scroll-auto  "
        ref={divRef}
        style={{
          height: "68vh",
          overflowY: "scroll",
          "@media (max-width: 768px)": {
            height: "0vh",
          },
        }}
      >
        {begin === false ? (
          <div>
            {voiceMessages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                } mb-4`}
              >
                {message.sender === "gpt" ? (
                  <p
                    className={`bg-gray-300 py-2 px-4 rounded-lg inline-block ${
                      message.sender === "user"
                        ? "rounded-br-none"
                        : "rounded-bl-none"
                    }`}
                  >
                    <div className=" ">
                      <div className="flex">
                        <img className="w-5 h-5 mr-2" src={Photo} alt="" />
                        <Typewriter message={message} />
                      </div>
                      <div className="flex ml-6">
                        <div
                          className="mt-4 bg-red-150 w-max  border border-white rounded-xl text-white p-2 cursor-pointer "
                          onClick={() => voiceValidation(true)}
                        >
                          Evet
                        </div>
                        <div
                          className="mt-4 bg-red-150 w-max  border border-white rounded-xl text-white  p-2 ml-6 cursor-pointer"
                          onClick={() => voiceValidation(false)}
                        >
                          Hayır
                        </div>
                      </div>
                    </div>
                  </p>
                ) : (
                  <p
                    className={`bg-gray-200 py-2 px-4 rounded-lg inline-block ${
                      message.sender === "user"
                        ? "rounded-br-none"
                        : "rounded-bl-none"
                    }`}
                  >
                    <div className="flex">
                      <p>{message.text}</p>

                      <img className="w-5 h-5 mr-2" src={Anon} alt="" />
                    </div>
                    <p className="flex text-xxs text-gray-500  ml-1 justify-end mr-0 sm:mr-3 ">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}

        {begin === true ? (
          <div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                } mb-4`}
              >
                {message.sender === "gpt" ? (
                  <p
                    className={`bg-gray-300 py-2 px-4 rounded-lg inline-block ${
                      message.sender === "user"
                        ? "rounded-br-none"
                        : "rounded-bl-none"
                    }`}
                  >
                    <div className="flex ">
                      <img className="w-5 h-5 mr-2" src={Photo} alt="" />
                      <Typewriter message={message} />
                      <audio
                        ref={audioRef}
                        src={audioUrl}
                        controls
                        style={{ display: "none" }}
                      >
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </p>
                ) : (
                  <p
                    className={`bg-gray-200 py-2 px-4 rounded-lg inline-block ${
                      message.sender === "user"
                        ? "rounded-br-none"
                        : "rounded-bl-none"
                    }`}
                  >
                    <div className="flex">
                      <p>{message.text}</p>

                      <img className="w-5 h-5 mr-2" src={Anon} alt="" />
                    </div>
                    <p className="flex text-xxs text-gray-500  ml-1 justify-end mr-0 sm:mr-3 ">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}

        <Loading />
        <TimeOut />
      </main>
      <div className=" mx-auto text-center  text-xxs mb-1 bg-gray-200 py-2 px-4 rounded-lg">
        ChatGPT can make mistakes. Consider checking important information.
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 flex-none">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full py-2 px-4"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={!checked}
            className={` text-white px-4 py-2 rounded-full' ${
              checked ? "bg-red-150" : "bg-gray-400"
            }`}
          >
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
