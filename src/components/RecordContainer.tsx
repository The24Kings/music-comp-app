import "./RecordContainer.css"

import React, { useState, useRef } from "react";
import { IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonToolbar, IonIcon, IonSpinner } from '@ionic/react';
import { download } from 'ionicons/icons';


interface ContainerProps {
    name: string;
}
const mimeType = 'audio/mpeg';

const RecordContainer: React.FC<ContainerProps> = ({ name })  => {

    //Change button image based on the user's system preferences
    const [buttonImage, setButtonImage] = useState('./resources/button_black.png');

    function querySystem(){
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        React.useEffect(() => {
            function updateTheme(){
                const systemPrefersDark = mediaQueryList.matches;
                if(systemPrefersDark){
                    //console.log('system prefers dark')
                    setButtonImage('./resources/button_white.png')
                }
                else{
                    //console.log('system prefers light')
                    setButtonImage('./resources/button_black.png')
                }
            }

            updateTheme()
            mediaQueryList.addEventListener("change", updateTheme)
            mediaQueryList.addListener(e => e.matches && updateTheme)

            return() => {
                mediaQueryList.removeEventListener("change", updateTheme)
            };
        }, [mediaQueryList]);
    };

    querySystem();

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const array = [];

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
                let isGranted: boolean = true;
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
        //const i = 0;
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
    getMicrophonePermission();
  
    return (
          <IonContent>
                <div className="audio-controls">
                     <img id="object" src={`${buttonImage}`}/>
                  
                     <IonButton id="trigger" onClick={startRecording}>
                        Start Recording
                     </IonButton>
                  
                     {recordingStatus === "recording" ? (
                        <IonSpinner name="circles"></IonSpinner>
                     ) : null}

                    <IonButton color="danger" margin-bottom="50px" onClick={stopRecording}>
                        Stop Recording
                    </IonButton>
                  
                {recordingStatus === "inactive" && audio ? (
                    <div className="audio-container">
                        <audio src={audio} controls controlsList="nodownload"></audio>
                        <a download="SavedRecording.mp3" href={audio}>
                            <IonIcon className="download" icon={download}></IonIcon>
                        </a>
                    </div>
                ) : null}
            </div>
        </IonContent>
    );
};

export default RecordContainer;