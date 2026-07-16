import { useState } from "react";
import "./VoiceSearchButton.css";

import { searchBuilding } from "../../services/nlpService";

export default function VoiceSearchButton({

    buildings,

    onSelectBuilding,

}) {

    const [listening, setListening] = useState(false);

    function startListening() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert("Speech Recognition is not supported in this browser.");

            return;

        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setListening(true);

        recognition.start();

        recognition.onresult = (event) => {

            const transcript = event.results[0][0].transcript;

            console.log("Voice Transcript:", transcript);

            const building = searchBuilding(transcript, buildings);

            console.log("Matched Building:", building);

            if (building) {

                onSelectBuilding(building);

            } else {

                alert("No matching location found.");

            }

        };

        recognition.onerror = () => {

            setListening(false);

        };

        recognition.onend = () => {

            setListening(false);

        };

    }

    return (

        <button

            className={`voice-search-btn ${listening ? "listening" : ""}`}

            onClick={startListening}

        >

            {

                listening

                    ? "🎙️ Listening..."

                    : "🎤"

            }

        </button>

    );

}