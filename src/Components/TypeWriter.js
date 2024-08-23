import React, { useState, useEffect } from "react";
const Typewriter = ({ message }) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let str = message.text;

    while (true) {
      let startIndex = str.indexOf("【");
      let endIndex = str.indexOf("】");

      // Eğer &#8203;``【oaicite:3】``&#8203; bulunamazsa, döngüden çık
      if (startIndex === -1 || endIndex === -1) {
        break;
      }

      let silinecekKisim = str.substring(startIndex, endIndex + 1);
      str = str.replace(silinecekKisim, "");
      // str = str.replace(/[\[\]\(\)]/g, "");
    }
    if (index < str.length) {
      const timer = setTimeout(() => {
        setCurrentText((prevText) => prevText + str[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 10); // 100 milisaniye aralıklarla harf ekler

      return () => {
        clearTimeout(timer);
      };
    }
  }, [index, message.text]);
  //   if (message.text.includes("【")) {

  //     let str = message.text;
  //     let startIndex = str.indexOf("【");
  //     let endIndex = str.indexOf("】");

  //     if (startIndex !== -1 && endIndex !== -1) {
  //       let silinecekKisim = str.substring(startIndex, endIndex + 1);
  //       str = str.replace(silinecekKisim, "");
  //     }

  //     return (
  //       <>
  //         {/* `message.text` içindeki URL'leri `a` elementine dönüştürülmüş haliyle kullanıyoruz */}
  //         <p style={{ whiteSpace: "pre-wrap" }}>{str}</p>
  //         <p className="text-xs text-gray-500 mt-1 ml-1">
  //           {new Date(message.timestamp).toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           })}
  //         </p>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <div style={{ overflow: "hidden" }}>
  //           <p>{currentText}</p>
  //           <p className="text-xs text-gray-500 mt-1 ml-1">
  //             {new Date(message.timestamp).toLocaleTimeString([], {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //             })}
  //           </p>
  //         </div>
  //       </>
  //     );
  //   }
  // };
  if (message.text.includes("www.")) {
    // let str =
    //   "Bu bir örnek metindir &#8203;``【oaicite:7】``&#8203; ve devam ediyor.";
    // str = str.replace(/&#8203;``【oaicite:6】``&#8203;/g, "");
    // console.log(str);

    // `message.text` içindeki URL'leri `a` elementine dönüştürmek için bir Regex kullanıyoruz
    let str = message.text;
    while (true) {
      let startIndex = str.indexOf("【");
      let endIndex = str.indexOf("】");

      // Eğer &#8203;``【oaicite:3】``&#8203; bulunamazsa, döngüden çık
      if (startIndex === -1 || endIndex === -1) {
        break;
      }

      let silinecekKisim = str.substring(startIndex, endIndex + 1);
      str = str.replace(silinecekKisim, "");
    }
    str = str.replace(/[\[\]\(\)]/g, "");

    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;
    let textParts = str.split(urlRegex);
    // textParts = textParts.map(url => url.endsWith(')') ? url.slice(0, -1) : url);
    const textElements = [];
    function adjustString(str) {
      if (str.endsWith("l")) {
        return str;
      } else {
        return str.slice(0, -1);
      }
    }

    for (let i = 0; i < textParts.length; i++) {
      let textPart = textParts[i];
      if (textPart !== undefined) {
        if (textPart.match(urlRegex)) {
          textPart = adjustString(textPart);
          if (
            textPart ===
              "https://www.mediamarkt.com.tr/tr/marketselection.html" ||
            textPart === "https://www.hepsiburada.com/magaza/mediamarkt" ||
            textPart ===
              "https://www.trendyol.com/magaza/mediamarkt-m-275331?sk=1" ||
            textPart ===
              "https://www.mediamarkt.com.tr/tr/shop/blackfriday.html" ||
            textPart ===
              "https://www.mediamarkt.com.tr/tr/shop/sevgiliye-hediye.html" ||
            textPart ===
              "https://www.mediamarkt.com.tr/tr/shop/yilbasi-hediyeleri.html"
          ) {
            textElements.push(
              <div className=" flex mt-4 bg-red-150 w-max  border border-white rounded-xl text-white  ">
                <a
                  key={i}
                  href={
                    // "https://" +
                    textPart +
                    "?utm_source=homepage&utm_medium=ai&utm_campaign=mediamarkt-ai"
                  }
                  className="p-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linke Tıkla
                </a>
              </div>
            );
          } else {
            // if(textPart[(textPart.length)-1] !== "l"){
            //   const deletedItem = textPart[(textPart.length)-1];
            //   const index = textPart.indexOf(deletedItem);
            //   if(index > -1){
            //     textPart.splice(index,1)
            //   }
            // }
            textElements.push(
              <div className=" flex mt-4 bg-red-150 w-max  border border-white rounded-xl text-white  ">
                <a
                  key={i}
                  href={
                    // "https://" +
                    textPart +
                    "?utm_source=homepage&utm_medium=ai&utm_campaign=mediamarkt-ai"
                  }
                  className="p-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ürüne Git
                </a>
              </div>
            );
          }
          // URL'yi bir `a` elementine dönüştürüyoruz
        } else {
          textElements.push(textPart);
        }
      }
    }

    return (
      <>
        {/* `message.text` içindeki URL'leri `a` elementine dönüştürülmüş haliyle kullanıyoruz */}
        <p style={{ whiteSpace: "pre-wrap" }}>{textElements}</p>
        <p className="flex text-xxs text-gray-500 mt-1  justify-end">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </>
    );
  } else {
    return (
      <>
        <div style={{ overflow: "hidden" }}>
          <div>
            {currentText.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <p className="flex text-xxs text-gray-500 mt-1  justify-end">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </>
    );
  }
};

export default Typewriter;
