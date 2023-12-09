import "./RecordContainer.css"
import React, { useState, useRef } from "react";
import { IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonToolbar, IonIcon, IonSpinner } from '@ionic/react';
import { download } from 'ionicons/icons';
import { isPlatform } from '@ionic/react';

import { Filesystem, Directory, Encoding, } from '@capacitor/filesystem';

interface ContainerProps {
    name: string;
}
const mimeType = 'audio/mpeg';

const RecordContainer: React.FC<ContainerProps> = ({ name }) => {
    window.onload = function () {
        getMicrophonePermission();
    };

    //Change button image based on the user's system preferences
    const [buttonImage, setButtonImage] = useState('../assets/pictures/button_black.png');

    function querySystem() {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        React.useEffect(() => {
            function updateTheme() {
                const systemPrefersDark = mediaQueryList.matches;
                if (systemPrefersDark) {
                    //console.log('system prefers dark')
                    setButtonImage('../assets/pictures/button_white.png')
                }
                else {
                    //console.log('system prefers light')
                    setButtonImage('../assets/pictures/button_black.png')
                }
            }

            updateTheme()
            mediaQueryList.addEventListener("change", updateTheme)
            mediaQueryList.addListener(e => e.matches && updateTheme)

            return () => {
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
                alert("Please go to Settings and enable Microphone!")
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        getMicrophonePermission();
        if (permission) {
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
        }
        else { return }
    };

    const stopRecording = () => {
        try {
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
        } catch (err) {
            console.log(err.message);
        }
    };
    const handleDownloadClick = async () => {
        try {
            const timestamp = new Date().getTime();
            const fileName = `SavedRecording_${timestamp}.mp3`;

            if (isPlatform('android')) {
                // Android specific download handling
                // Add your Android-specific code here
                // For example, you can use Capacitor's Filesystem API for Android
                const { uri } = await Filesystem.writeFile({
                    path: fileName,
                    data: audio,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8,
                });
                console.log('File saved at:', uri);
            } else {
                // Web-specific download handling
                // Add your web-specific code here
                // For example, you can create an anchor element and simulate a click to download the file
                const downloadLink = document.createElement('a');
                downloadLink.href = audio;
                downloadLink.download = fileName;
                downloadLink.click();
            }
        } catch (error) {
            alert('Error saving/downloading file:');
        }
    };

    return (
        <IonContent>
            <div className="audio-controls">
                <img id="object" src={`${buttonImage}`} />

                <IonButton id="trigger" onClick={startRecording}>
                    Start Recording
                </IonButton>

                {recordingStatus === "recording" ? (
                    <IonSpinner name="circles"></IonSpinner>

                ) : null}

                <IonButton color="danger" margin-bottom="50px" onClick={stopRecording} disabled={!permission}>
                    Stop Recording
                </IonButton>

                {recordingStatus === 'inactive' && audio ? (
                    <div className="audio-container">
                        <audio src={audio} controls controlsList="nodownload"></audio>
                        {isPlatform('android') ? (
                            <IonButton onClick={handleDownloadClick} fill="clear">
                                <IonIcon icon={download} slot="start" size="large" />
                            </IonButton>
                        ) : (
                            // No need for a separate button on the web, use a simple anchor element
                            <a download={`SavedRecording_${new Date().getTime()}.mp3`} href={audio}>
                                <IonButton fill="clear">
                                    <IonIcon icon={download} slot="start" size="large" />
                                </IonButton>
                            </a>
                        )}
                    </div>
                ) : null}
            </div>
        </IonContent>
    );
};

export default RecordContainer;