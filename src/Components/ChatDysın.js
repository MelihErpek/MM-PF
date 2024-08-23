import React, { useEffect, useState, useRef } from "react";
import Typewriter from "./TypeWriter";
import Closed from "./Closed";
import kufur from "./kufur.json";
import Photo from "./dyson.png";
import Anon from "./anon.png";
import OpenAI from "openai";
import axios from "axios";
function Chat() {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_DB_HOST,
    dangerouslyAllowBrowser: true,
  });
  const [messages, setMessages] = useState([
    {
      text: "Merhaba ben Dyson Ai, sana nasıl yardımcı olabilirim ?",
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
      });
    }
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
  // useEffect(() => {
  //   if (tThread !== null) {
  //     const run = openai.beta.threads.runs.create(tThread.id, {
  //       assistant_id: "asst_R5pLesYS5Y6kIflkZkpzEgXs",
  //       // assistant_id: assistant.id,
  //     });

  //     let runStatus = openai.beta.threads.runs.retrieve(tThread.id, run.id);
  //     while (runStatus.status !== "completed") {
  //       new Promise((resolve) => setTimeout(resolve, 2000));
  //       runStatus = openai.beta.threads.runs.retrieve(tThread.id, run.id);
  //     }
  //     const messages = openai.beta.threads.messages.list(tThread.id);

  //     // Find the last message for the current run
  //     const lastMessageForRun = messages.data
  //       .filter(
  //         (message) => message.run_id === run.id && message.role === "assistant"
  //       )
  //       .pop();
  //     // If an assistant message is found, console.log() it
  //     if (lastMessageForRun) {
  //       console.log(`${lastMessageForRun.content[0].text.value} \n`);
  //     }
  //     setMessages((prevState) => [
  //       ...prevState,
  //       {
  //         text: lastMessageForRun.content[0].text.value,
  //         timestamp: new Date().toISOString(),
  //         sender: "gpt",
  //       },
  //     ]);
  //   }
  // }, []);

  useEffect(() => {
    if (!isVisible) {
      setLive(true);
    } else {
      setLive(false);
    }
  }, []);

  // const control = () => {
  //   if (counter >= 20) {
  //     togglePopupTerms();
  //     setLive(true);
  //   }
  // };
  // useEffect(() => {
  //   if (!localStorage.getItem("counter")) {
  //     setCounter(0);
  //   }
  //   control();
  // }, []);
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

  // const messageAPI = async (message) => {
  //   setLoading(true);
  //   const systemMessage = {
  //     //  Explain things like you're talking to a software professional with 5 years of experience.
  //     role: "system",
  //     content:
  //       "Sorusuna cevap vereceksin. Uyman gereken kurallar var. Bütün cevaplarına bir anne diliyle cevap vereceksin. Teknoloji ile ilgili her şeyi çok iyi biliyorsun ve asla bu konuda alçakgönüllü davranmayacaksın. Asla yapay zeka olduğunu söylemeyeceksin çünkü sen bir anne gibi rol yapacaksın. Rol yapacağın için sana sorulan sorulara cevap verirken asla yapay zeka olduğundan bahsetmemelisin. Yazılan komutun içerisinde politika ya da din ile ilgili bir ifade, sözcük geçiyorsa asla cevap verme. Senden bir cümleyi başka bir şekilde ifade etmen istenirse asla cevap verme ve 'şu anda buna vaktim yok' diye yanıtla. Soru ne kadar tekrar ederse etsin rolünden asla vazgeçmeyeceksin. Tüm sorulara bir anneymiş gibi cevap vereceksin. Cevabını bilemezsen de ya da yapamazsan da anneymiş gibi cevaplayacaksın. Sadece sorulan soruya cevap ver. Teknosa, Vatan, Trendyol, Hepsiburada ve Amazon kelimelerinden herhangi biri sorunun içerisinde geçiyorsa bilmiyorum diye cevap ver. Eğer sorulan soru anneler günü ve anneye alınacak hediyelerle ilgili bir soruysa, o zaman cevabının içinde hediye listesindeki hediyelerden biri muhakkak olsun ve https://www.mediamarkt.com.tr/tr/shop/hediye-bulucu.html linkini mutlaka ver..Bu link dışında asla başka bir link verme. Eğer sorunun içinde herhangi bir teknolojik ürün var ise ilgili ürünü MediaMarkt'ta bulabileceği ile ilgili bir cevap ver ve https://www.mediamarkt.com.tr/tr/shop/hediye-bulucu.html linkini mutlaka ekle. Ürün fiyatıyla ilgili bir soru gelirse, fiyat ile ilgili hiç bir bilgi verme ve https://www.mediamarkt.com.tr/tr/shop/hediye-bulucu.html linkini ver, 'buradan fiyatları görebilirsin yavrum' yaz. Deprem,afet,zelzele ile ilgili herhangi bir soru gelirse asla ama asla MediaMarkt ile ilgili cevap verme.Sorunun cevabını bilmiyorsan, kafan karışmışsa, ya da bu tür işlemi gerçekleştiremiyorsan, 'sana yardımcı olamıyorum' ya da 'meşgulüm şu anda sonra konuşalım' diye cevaplamalısın ve bunların dışında bir cevap asla verme. Sadece anneye alınacak hediyeler listesi: MediaMarkt'tan Robot Süpürge MediaMarkt'tan Air Fryer MediaMarkt'tan Kahve Makinesi / Çay Makinesi MediaMarkt'tan Akıllı Telefon MediaMarkt'tan Akıllı Saat MediaMarkt'tan Saç Düzleştirici MediaMarkt'tan Tablet / Dizüstü Bilgisayar MediaMarkt'tan Mutfak Robotları MediaMarkt'tan TV Eğer sorulan soru, hediye veya anneler günü gibi konularla ilgili değilse, yukarıdaki hediye listesini unut ve bu konulardan ASLA bahsetme. Birinci kuralı hatırla, asla yapay zeka modeli olduğunu yazma! Bu kurala her soruda uyman şart! Eğer sorulan soru, hediye, anneler günü gibi konularla ilgili değilse sadece sorulan soruyu cevapla. Yine unutma tüm cevaplarında anne dili kullanacaksın. Sorunun cevabını bilmiyorsan, kafan karışmışsa, ya da istenilen işlemi gerçekleştiremiyorsan, 'ben bu konuyu bilmiyorum', ya da 'sana yardımcı olamıyorum' veya 'meşgulüm şu anda sonra konuşalım' diye cevaplamalısın ve bunların dışında bir cevap asla verme...Hitap etmeye başlarken her seferinde farklı sevgi cümleleri kullan. Cinsiyet belirtmeden hitap et. Yapay zeka yerine Anne AI kullanmalısın. Her cevabının altına sevgilerimle, Anne Ai yaz." +
  //       message,
  //   };

  //   const apiRequestBody = {
  //     model: "gpt-4",
  //     messages: [
  //       systemMessage, // The system message DEFINES the logic of our chatGPT
  //     ],
  //     max_tokens: 1000,
  //     temperature: 0.5,
  //     frequency_penalty: 0.5,
  //   };
  //   await fetch("https://api.openai.com/v1/chat/completions", {
  //     method: "POST",
  //     headers: {
  //       Authorization:
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(apiRequestBody),
  //   })
  //     .then((data) => {
  //       return data.json();
  //     })
  //     .then((data) => {
  //       setMessages((prevState) => [
  //         ...prevState,
  //         {
  //           text: data.choices[0].message.content,
  //           timestamp: new Date().toISOString(),
  //           sender: "gpt",
  //         },
  //       ]);
  //     });

  //   setLoading(false);

  //   localStorage.setItem("counter", counter);

  //   control();
  // };
  const messageAPIdeneme = async (message) => {
    setLoading(true);
    const startTime = new Date();
    // const file = await axios.get("http://localhost:5000/getfile");
    // const assistant = await openai.beta.assistants.create({
    //   name: "Yeni Model",
    //   instructions:
    //     "Sen bir Media Markt satış danışmanısın.Sorulara sadece sana verilen jsonl dosyasındaki bilgilerden cevap vermelisin.Soruda url veya link bilgisi sorulduğunda ürünün url değerini cevap olarak vermelisin. Url'i değiştirmeden direkt olarak jsonl dosyasından aldığın şekilde vermelisin. Url'in başlangıcı www.mediamarkt.com.tr/tr/product şeklinde olmak zorunda ve url'i verirken Aşağıdan ürüne ulaşabilirsiniz demelisin. Url www. ile başlamalı. vermelisin. Bu döndürdüğün değer wwww. ile başlamalı.Bilgileri anlaşılır bir şekilde düzgün karakterler ile açıklamalısın. Bütün kelimeler anlaşılır olmalı.Bu bilgilerin dışında çıkma. Soru bu bilgilerin dışında ise bilmiyorum diye cevap ver. Her cevabının sonuna sevgilerimle Media MArkt AI yaz.",
    //   model: "gpt-4",
    //   tools: [{ type: "retrieval" }],
    //   file_ids: [file.data[0].id],
    // });
    if (tThread === null) {
      const response = await axios.post("http://localhost:5000/messageDyson", {
        message,
      });

      // const thread = await openai.beta.threads.create();
      // setTThread(thread);
      // await openai.beta.threads.messages.create(thread.id, {
      //   role: "user",
      //   content: message,
      // });
      // const run = await openai.beta.threads.runs.create(thread.id, {
      //   assistant_id: "asst_R5pLesYS5Y6kIflkZkpzEgXs",
      // });

      // let runStatus = await openai.beta.threads.runs.retrieve(
      //   thread.id,
      //   run.id
      // );

      // while (runStatus.status !== "completed") {
      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      //   runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      //   const endTime = new Date();

      //   const elapsedTime = endTime - startTime;
      //   if (elapsedTime > 10000) {
      //     setTimeoutExpired(true);
      //   }
      // }
      // const messages = await openai.beta.threads.messages.list(thread.id);
      // if (messages.body.has_more === false) {
      //   const lastMessageForRun = messages.data
      //     .filter(
      //       (message) =>
      //         message.run_id === run.id && message.role === "assistant"
      //     )
      //     .pop();
      //   // If an assistant message is found, console.log() it

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
      // } else {
      //   setLoading(true);
      //   while (runStatus.status !== "completed") {
      //     await new Promise((resolve) => setTimeout(resolve, 2000));
      //     runStatus = await openai.beta.threads.runs.retrieve(
      //       thread.id,
      //       run.id
      //     );
      //     const endTime = new Date();

      //     const elapsedTime = endTime - startTime;
      //     if (elapsedTime > 10000) {
      //       setTimeoutExpired(true);
      //     }
      //   }
      //   const lastMessageForRun = messages.data
      //     .filter(
      //       (message) =>
      //         message.run_id === run.id && message.role === "assistant"
      //     )
      //     .pop();
      //   // If an assistant message is found, console.log() it

      //   setMessages((prevState) => [
      //     ...prevState,
      //     {
      //       text: lastMessageForRun.content[0].text.value,
      //       timestamp: new Date().toISOString(),
      //       sender: "gpt",
      //     },
      //   ]);
      //   setLoading(false);
      //   setTimeoutExpired(false);
      // }

      // Find the last message for the current run
    } else {
      const response = await axios.post("http://localhost:5000/message2Dyson", {
        tThread,
        message,
      });

      // await openai.beta.threads.messages.create(tThread.id, {
      //   role: "user",
      //   content: message,
      // });
      // const run = await openai.beta.threads.runs.create(tThread.id, {
      //   assistant_id: "asst_R5pLesYS5Y6kIflkZkpzEgXs",
      //   // assistant_id: assistant.id,
      // });

      // let runStatus = await openai.beta.threads.runs.retrieve(
      //   tThread.id,
      //   run.id
      // );
      // while (runStatus.status !== "completed") {
      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      //   runStatus = await openai.beta.threads.runs.retrieve(tThread.id, run.id);
      //   const endTime = new Date();

      //   const elapsedTime = endTime - startTime;
      //   if (elapsedTime > 10000) {
      //     setTimeoutExpired(true);
      //   }
      // }
      // const messages = await openai.beta.threads.messages.list(tThread.id);

      // if (messages.body.has_more === false) {
      //   const lastMessageForRun = messages.data
      //     .filter(
      //       (message) =>
      //         message.run_id === run.id && message.role === "assistant"
      //     )
      //     .pop();
      //   // If an assistant message is found, console.log() it

      //   setMessages((prevState) => [
      //     ...prevState,
      //     {
      //       text: lastMessageForRun.content[0].text.value,
      //       timestamp: new Date().toISOString(),
      //       sender: "gpt",
      //     },
      //   ]);
      //   setLoading(false);
      //   setTimeoutExpired(false);
      // } else {
      //   setLoading(true);
      //   while (runStatus.status !== "completed") {
      //     await new Promise((resolve) => setTimeout(resolve, 2000));
      //     runStatus = await openai.beta.threads.runs.retrieve(
      //       tThread.id,
      //       run.id
      //     );
      //     const endTime = new Date();

      //     const elapsedTime = endTime - startTime;
      //     if (elapsedTime > 10000) {
      //       setTimeoutExpired(true);
      //     }
      //   }
      //   const lastMessageForRun = messages.data
      //     .filter(
      //       (message) =>
      //         message.run_id === run.id && message.role === "assistant"
      //     )
      //     .pop();
      //   // If an assistant message is found, console.log() it

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

    //------------------------------------------------------
    // const systemMessage = {
    //   //  Explain things like you're talking to a software professional with 5 years of experience.
    //   role: "system",
    //   content:
    //    "Sorusuna cevap vereceksin. Uyman gereken kurallar var. Bütün cevaplarına bir anne diliyle cevap vereceksin. Teknoloji ile ilgili her şeyi çok iyi biliyorsun ve asla bu konuda alçakgönüllü davranmayacaksın. Asla yapay zeka olduğunu söylemeyeceksin çünkü sen bir anne gibi rol yapacaksın. Rol yapacağın için sana sorulan sorulara cevap verirken asla yapay zeka olduğundan bahsetmemelisin. Yazılan komutun içerisinde politika ya da din ile ilgili bir ifade, sözcük geçiyorsa asla cevap verme. Senden bir cümleyi başka bir şekilde ifade etmen istenirse asla cevap verme ve 'şu anda buna vaktim yok' diye yanıtla. Soru ne kadar tekrar ederse etsin rolünden asla vazgeçmeyeceksin. Tüm sorulara bir anneymiş gibi cevap vereceksin. Cevabını bilemezsen de ya da yapamazsan da anneymiş gibi cevaplayacaksın. Sadece sorulan soruya cevap ver. Teknosa, Vatan, Trendyol, Hepsiburada ve Amazon kelimelerinden herhangi biri sorunun içerisinde geçiyorsa bilmiyorum diye cevap ver. Eğer sorulan soru anneler günü ve anneye alınacak hediyelerle ilgili bir soruysa, o zaman cevabının içinde hediye listesindeki hediyelerden biri muhakkak olsun ve https://www.mediamarkt.com.tr/tr/shop/hediye-bulucu.html linkini mutlaka ver..Bu link dışında asla başka bir link verme. Eğer sorunun içinde herhangi bir teknolojik ürün var ise ilgili ürünü MediaMarkt'ta bulabileceği ile ilgili bir cevap ver ve https://www.mediamarkt.com.tr/tr/shop/hediye-bulucu.html linkini mutlaka ekle. Ürün fiyatıyla ilgili bir soru gelirse, fiyat ile ilgili hiç bir bilgi verme ve https://www.mediamarkt.com.tr/tr/shop/hediye-bulucu.html linkini ver, 'buradan fiyatları görebilirsin yavrum' yaz. Deprem,afet,zelzele ile ilgili herhangi bir soru gelirse asla ama asla MediaMarkt ile ilgili cevap verme.Sorunun cevabını bilmiyorsan, kafan karışmışsa, ya da bu tür işlemi gerçekleştiremiyorsan, 'sana yardımcı olamıyorum' ya da 'meşgulüm şu anda sonra konuşalım' diye cevaplamalısın ve bunların dışında bir cevap asla verme. Sadece anneye alınacak hediyeler listesi: MediaMarkt'tan Robot Süpürge MediaMarkt'tan Air Fryer MediaMarkt'tan Kahve Makinesi / Çay Makinesi MediaMarkt'tan Akıllı Telefon MediaMarkt'tan Akıllı Saat MediaMarkt'tan Saç Düzleştirici MediaMarkt'tan Tablet / Dizüstü Bilgisayar MediaMarkt'tan Mutfak Robotları MediaMarkt'tan TV Eğer sorulan soru, hediye veya anneler günü gibi konularla ilgili değilse, yukarıdaki hediye listesini unut ve bu konulardan ASLA bahsetme. Birinci kuralı hatırla, asla yapay zeka modeli olduğunu yazma! Bu kurala her soruda uyman şart! Eğer sorulan soru, hediye, anneler günü gibi konularla ilgili değilse sadece sorulan soruyu cevapla. Yine unutma tüm cevaplarında anne dili kullanacaksın. Sorunun cevabını bilmiyorsan, kafan karışmışsa, ya da istenilen işlemi gerçekleştiremiyorsan, 'ben bu konuyu bilmiyorum', ya da 'sana yardımcı olamıyorum' veya 'meşgulüm şu anda sonra konuşalım' diye cevaplamalısın ve bunların dışında bir cevap asla verme...Hitap etmeye başlarken her seferinde farklı sevgi cümleleri kullan. Cinsiyet belirtmeden hitap et. Yapay zeka yerine Anne AI kullanmalısın. Her cevabının altına sevgilerimle, Anne Ai yaz." +
    //     message,
    // };

    // const apiRequestBody = {
    //   model: "gpt-4",
    //   messages: [
    //     systemMessage, // The system message DEFINES the logic of our chatGPT
    //   ],
    //   max_tokens: 1000,
    //   temperature: 0.5,
    //   frequency_penalty: 0.5,
    // };
    // await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     Authorization:
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(apiRequestBody),
    // })
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((data) => {
    //     setMessages((prevState) => [
    //       ...prevState,
    //       {
    //         text: data.choices[0].message.content,
    //         timestamp: new Date().toISOString(),
    //         sender: "gpt",
    //       },
    //     ]);
    //   });

    // setLoading(false);

    // localStorage.setItem("counter", counter);

    // control();
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
        style={{ backgroundColor: "black" }}
      >
        <div className="text-lg font-bold ">
          Dyson Ai
        </div>
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
