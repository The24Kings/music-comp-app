import "./RecordContainer.css"

import { useState, useRef } from "react";
//import { FaBeer } from 'react-icons/fa';
//import { CommonModule } from "@angular/common";
//import { NgModule } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonToolbar, IonIcon } from '@ionic/react';
import { download } from 'ionicons/icons';

interface ContainerProps {
    name: string;
}
const mimeType = 'audio/mpeg';

const RecordContainer: React.FC<ContainerProps> = ({ name }) => {
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
        /*       else
              {
                alert("Cannot continue without microphone permissions");
              } */
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
            //array[0] = audioUrl;
        };
    };
    getMicrophonePermission();
    return (
        <IonContent>
            <div className="audio-controls">
                <img id="object"
                    src='./resources/button.png'
                />

                <IonButton onClick=
                    {startRecording}
                >
                    Start Recording
                </IonButton>
                {recordingStatus === "recording" ? (
                    <div className="progress">
                        <div className="progress__bar"></div>
                    </div>

                ) : null}
                <IonButton color="danger" margin-bottom="50px" onClick=
                    {stopRecording}>

                    Stop Recording
                </IonButton>
                {audio ? (
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