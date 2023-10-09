/*import './RecordContainer.css';
import { useState, useRef } from "react";
import VideoRecorder from '../components/VideoRecorder.jsx';
import AudioRecorder from '../components/AudioRecorder.jsx';
interface ContainerProps {
  name: string;
}*/
import { useState, useRef } from "react";
import "./RecordContainer.css"
import { FaBeer } from 'react-icons/fa';
const mimeType = "audio/webm";
interface ContainerProps {
  name: string;
}

const RecordContainer = () => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    // const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    // const [stream, setStream] = useState(null);
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
      const media = new MediaRecorder(stream, { type: mimeType });
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
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <i class="fa-solid fa-microphone"></i>
            <h2 align="center">Audio Recorder</h2>
            <main>
                <div className="audio-controls" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button" align="center">
                            <img
                                src="./resources/microphone(1).png"
                            />
                        </button>
                    ): null}
                    {permission && recordingStatus === "inactive" ? (
                    <button onClick={startRecording} type="button">
                        Start Recording
                    </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                    <button onClick={stopRecording} type="button">
                        Stop Recording
                    </button>
                    ) : null}
                </div>
                {audio ? (
                  <div className="audio-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                     <audio src={audio} controls></audio>
                     <a download href={audio}>
                        Download Recording
                     </a>
                   </div>
                ) : null}
            </main>
        </div>
    );
};

/*const RecordContainer: React.FC<ContainerProps> = ({ name }) => {
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };

    return (

        <div>
            <h1>React Media Recorder</h1>
            <div className="button-flex">
                <button onClick={toggleRecordOption("audio")}>
                  Record Audio
                </button>
                <button onClick={toggleRecordOption("video")}>
                  Record Video
                </button>
            </div>
            <div>
                {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
            </div>
        </div>

        /*<div className='container'>
            <strong>{name}</strong>
            <p>Help me</p>
                            <button onClick={toggleRecordOption("video")}>
                              Record Video
                            </button>
                            {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
        </div>
    );
};*/

export default RecordContainer;
