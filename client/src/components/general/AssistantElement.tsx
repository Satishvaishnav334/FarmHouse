import "regenerator-runtime/runtime";
import { AuthenticatedClient, Client, SignalListener } from '@botpress/chat';
import { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import SpeechRecognition from "react-speech-recognition";
import { toast } from "@/hooks/use-toast";
import { MessageEvent } from "@botpress/chat/dist/eventsource";
import { IoCloseSharp } from "react-icons/io5";
import useAutoStopListening from "@/hooks/useAutoStopListening";

type ConversationType = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

function AssistantElement() {
  const { browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const { transcript, listening, startListening } = useAutoStopListening(() => handleConversation());
  const [client, setClient] = useState<AuthenticatedClient | null>(null);
  const [conversation, setConversation] = useState<ConversationType | null>(null);
  const [listener, setListener] = useState<SignalListener | null>(null);

  // Connect to BotPress once on mount
  useEffect(() => {
    (async () => {
      try {
        const webhookId = import.meta.env.VITE_BOTPRESS_WEBHOOK_URL;
        if (!webhookId) throw new Error("Webhook ID is missing");
        const connectedClient = await Client.connect({ webhookId });
        setClient(connectedClient);
        console.log("BotPress client connected!");
      } catch (error) {
        console.error("Error connecting to BotPress:", error);
      } 
    })();
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function speakText(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = speechSynthesis.getVoices();
    if (voices && voices.length > 3) {
      utterance.voice = voices[3];
    }
    // Resume listening when speaking is finished
    utterance.onend = () => {
      startListeningHandler();
    };
    window.speechSynthesis.speak(utterance);
  }

  const startListeningHandler = () => {
    startListening({ continuous: true, language: "en-IN" });
  };

  const stopListeningHandler = () => {
    setTimeout(() => {
      resetTranscript();
    }, 300);
  };

  const handleBotResponse = async (listener: SignalListener) => {
    if (!listener || !client) return;
    try {
      const botResponse: MessageEvent = await new Promise((resolve) => {
        const onMessage = (event: MessageEvent) => {
          if (event.userId !== client.user.id) {
            listener.off("message_created", onMessage);
            resolve(event);
          }
        };
        listener.on("message_created", onMessage);
      });
      console.log("Bot's response:", botResponse.payload.text);
      speakText(botResponse.payload.text);
    } catch (error) {
      console.error("Error handling bot response:", error);
    }
  };

  // Create a new conversation and listener if needed
  const initializeConversation = async () => {
    SpeechRecognition.stopListening();
    if (!transcript || !client) {
      stopListeningHandler();
      return;
    }

    try {
      const { conversation: newConversation } = await client.createConversation({});
      console.log("Conversation started:", newConversation.id);
      setConversation(newConversation);

      const newListener = await client.listenConversation({ id: newConversation.id });
      setListener(newListener);

      await client.createMessage({
        conversationId: newConversation.id,
        payload: { type: "text", text: transcript },
      });
      console.log("User message sent:", transcript);

      await handleBotResponse(newListener);
    } catch (error) {
      if (error instanceof Error) {
        toast({ title: error.message || "Something went wrong", variant: "destructive" });
      } else {
        toast({ title: "Something went wrong", variant: "destructive" });
      }
      console.error("Error in initializeConversation:", error);
    } finally {
      stopListeningHandler();
    }
  };

  // Continue the existing conversation
  const continueConversation = async () => {
    SpeechRecognition.stopListening();
    if (!transcript || !client || !conversation || !listener) {
      stopListeningHandler();
      return;
    }
    try {
      await client.createMessage({
        conversationId: conversation.id,
        payload: { type: "text", text: transcript },
      });
      console.log("User message sent:", transcript);
      await handleBotResponse(listener);
    } catch (error) {
      if (error instanceof Error) {
        toast({ title: error.message || "Something went wrong", variant: "destructive" });
      } else {
        toast({ title: "Something went wrong", variant: "destructive" });
      }
      console.error("Error in continueConversation:", error);
    } finally {
      stopListeningHandler();
    }
  };

  // Decide whether to start a new conversation or continue the existing one
  const handleConversation = () => {
    if (conversation && listener) {
      continueConversation();
    } else {
      initializeConversation();
    }
  };

  return (
    <>
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex justify-center items-center space-x-2">
        <div
          onClick={startListeningHandler}
          className={`bg-slate-700 dark:bg-zinc-100 dark:text-zinc-900 text-zinc-100 cursor-pointer ${listening ? "animate-pulse shadow-lg" : ""} py-2 px-4 rounded-md`}
        >
          {listening ? transcript : "Say something"}
        </div>
        {listening && (
          <button
            onClick={handleConversation}
            className="p-2.5 animate-in text-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md"
          >
            <IoCloseSharp />
          </button>
        )}
      </div>
    </>
  );
}

export default AssistantElement;
