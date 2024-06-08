"use client";

import { useRecordVoice } from "@/hooks/useRecordVoice";
import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneAltSlash } from "react-icons/fa";
const RecorderButton = () => {
  const { startRecording, stopRecording, audio,recording } = useRecordVoice();
  function handleRecording() {
    if(!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  }

  return (
    <div>
      <button
        onClick={handleRecording}
        className="border-none bg-transparent rounded-full bg-red-100 p-4"
      >
        {/* Microphone icon component */}
        {!recording ? <FaMicrophoneAltSlash /> : <FaMicrophone />}
      </button>
      {audio && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio src={audio} controls />
        </div>
      )}
    </div>
  );
};

export { RecorderButton };