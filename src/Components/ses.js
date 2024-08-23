import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const Home = () => {
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isAudioAllowed, setIsAudioAllowed] = useState(false);

  useEffect(() => {
    const text = "buzdolabında indirim var";
    const fetchAudio = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get-audio",
          {
            text,
          }
        );
        // console.log(response.data.url);
        // const data = await response.json();
        if (response.data.url) {
          setAudioUrl(response.data.url);
        }
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
    };

    fetchAudio();
  }, []);

  const handleAllowAudio = () => {
    setIsAudioAllowed(true);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Play was prevented:", error);
      });
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioUrl}
        controls
        style={{ display: isAudioAllowed ? "block" : "none" }}
      >
        Your browser does not support the audio element.
      </audio>
      {!isAudioAllowed && (
        <button onClick={handleAllowAudio}>Allow Audio</button>
      )}
    </div>
  );
};

export default Home;
