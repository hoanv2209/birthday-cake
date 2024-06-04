// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import "@dotlottie/player-component";
import "./App.css";
import { Cake } from "./components/Cake";
import { Name } from "./components/Name";
import Greetings from "./components/Greetings";
import GiftBox from "./components/GiftBox";

const src = new URL("/assets/hbd2.mp3", import.meta.url).href;
function App() {
  const [candleVisible, setCandleVisible] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(new Audio(src));
  const microphoneStreamRef = useRef<MediaStream | undefined>(undefined);

  const blowCandles = useCallback(async (stream: MediaStream) => {
    try {
      microphoneStreamRef.current = stream;

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const detectBlow = () => {
        analyser.getByteFrequencyData(dataArray);
        const average =
          dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
        const threshold = 43;

        if (average > threshold) {
          setCandleVisible(false);
        }
      };

      setInterval(detectBlow, 100);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }, []);

  const onEnded = useCallback(() => {}, []);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        if (stream) {
          blowCandles(stream);
        }
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    })();

    return () => {
      if (microphoneStreamRef.current) {
        microphoneStreamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [blowCandles]);

  const [showGiftBox, setShowGiftBox] = useState(true);
  const handleGiftBoxClick = () => {
    setShowGiftBox(false);
    audioRef.current.load();
    audioRef.current.play();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        justifyContent: "space-between",
      }}
    >
      {showGiftBox && <GiftBox onClick={handleGiftBoxClick} />}
      <Greetings />

      <audio {...{ src, ref: audioRef, preload: "auto", onEnded }} />

      <div>
        <Name />
        <Cake {...{ candleVisible }} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <dotlottie-player
          src="/assets/hbd.lottie"
          autoplay
          loop
          style={{
            zIndex: 20,
            visibility: "visible",
            width: 400,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <dotlottie-player
          src="/assets/confetti.lottie"
          autoplay
          loop
          style={{
            zIndex: 30,
            visibility: "visible",
            width: 400,
          }}
        />
      </div>
    </div>
  );
}

export default App;
