import "./RecordContainer.css"

import { useState, useRef } from "react";
import { FaBeer } from 'react-icons/fa';

interface ContainerProps {
  name: string;
}
const mimeType = 'audio/mpeg';

const RecordContainer: React.FC<ContainerProps> = ({ name })  => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
      setRecordingStatus("recording");
      //create new Media recorder instance using the stream
      const media = new MediaRecorder(stream);
      //set the MediaRecorder instance to the mediaRecorder ref
      mediaRecorder.current = media;
      //invokes the start method to start the recording process
      mediaRecorder.current.start();

      let localAudioChunks = [];

      mediaRecorder.current.ondataavailable = (event) => {
         if (typeof event.data === "undefined") return;
         if (event.data.size === 0) return;
         localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
      setRecordingStatus("inactive");
      //stops the recording instance
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = () => {
        //creates a blob file from the audiochunks data
         const audioBlob = new Blob(audioChunks, { type: mimeType });
        //creates a playable URL from the blob file.
         const audioUrl = URL.createObjectURL(audioBlob);

         setAudio(audioUrl);
         setAudioChunks([]);
      };
    };

    /* Needs to be migrated over to Ionic Style Tags rather than HTML Style Tags */
    return (
        <div>
            <main>
                <div className="audio-controls">
                    <img id="object"
                        src='./resources/button.png'
                    />
                    <button onClick={getMicrophonePermission} type="button" aria-label="Get Microphone Permission">
                        Get Microphone Permissions
                    </button>
                    <button onClick={startRecording} type="button">
                        Start Recording
                    </button>
                    {recordingStatus === "recording" ? (
                        <div className="progress">
                          <div className="progress__bar"></div>
                        </div>

                    ) : null}
                    <button onClick={stopRecording} type="button">
                        Stop Recording
                    </button>
                {audio ? (
                    <div className="audio-container">
                        <audio src={audio} controls></audio>
                        <a download href={audio}>
                            Download Recording
                        </a>
                    </div>

                ) : null}
                </div>
            </main>
        </div>
    );
};

export default RecordContainer;
