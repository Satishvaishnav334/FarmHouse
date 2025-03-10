import { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import SpeechRecognition from "react-speech-recognition";

function useAutoStopListening(onStop: () => void) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [lastTranscript, setLastTranscript] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!listening) return;

    if (transcript !== lastTranscript) {
      setLastTranscript(transcript);

      // Reset previous timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Set new timeout to stop listening after 2s of no change
      const id = setTimeout(() => {
        console.log("Stopping due to inactivity...");
        SpeechRecognition.stopListening();
        resetTranscript();

        if (onStop) onStop(); // Call the provided function with the final transcript
      }, 2000);

      setTimeoutId(id);
    }
  }, [transcript, listening, lastTranscript]);

  return {
    transcript,
    listening,
    startListening: SpeechRecognition.startListening,
  };
}

export default useAutoStopListening;
