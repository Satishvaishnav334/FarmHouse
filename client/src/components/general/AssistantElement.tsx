import "regenerator-runtime/runtime";
import Spline from "@splinetool/react-spline";
import { useSpeechRecognition } from "react-speech-recognition";
import SpeechRecognition from "react-speech-recognition"; // Import SpeechRecognition API

function AssistantElement() {
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {!listening ? (
          <button
            className="bg-slate-700 dark:bg-zinc-100 dark:text-zinc-900 text-zinc-100 py-2 px-4 rounded-md"
            onClick={() => SpeechRecognition.startListening({ continuous: true, language: "en-IN" })} // Start listening
          >
            Listen
          </button>
        ) : (
          <button
            className="mt-2 bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={() => {
              SpeechRecognition.stopListening();
              setTimeout(() => resetTranscript(), 100);
            }} // Stop listening
          >
            Stop Listening
          </button>
        )}

        {transcript && <div className="mt-4 p-2 z-50 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md w-80 text-center">
          {transcript}
        </div>}
      </div>

      {/* Spline with Fade Effect */}
      <div
        className={`fixed bottom-32 left-1/2 -translate-x-1/2 transition-all duration-500 ${listening ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <button onClick={SpeechRecognition.stopListening} className="focus:outline-none">
          <Spline
            style={{ width: "100%", height: "100%" }}
            scene="https://prod.spline.design/AjgonRzEUlQSFiMp/scene.splinecode"
          />
        </button>
      </div>
    </>
  );
}

export default AssistantElement;
