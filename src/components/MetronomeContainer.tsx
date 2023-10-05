import './MetronomeContainer.css';

import React, { useState, useEffect, useRef } from 'react';
import { IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonToolbar } from '@ionic/react';
import sound1 from "/assets/sounds/metronomeSound1.mp3";
import sound2 from "/assets/sounds/metronomeSound2.mp3";
import sound3 from "/assets/sounds/metronomeSound3.mp3";

interface ContainerProps {
    name: string;
}

const MetronomeContainer: React.FC<ContainerProps> = ({ name }) => {
    const imagePaths = [
        '../assets/pictures/metronome left lower.jpg',
        '../assets/pictures/metronome left upper.jpg',
        '../assets/pictures/metronome middle.jpg',
        '../assets/pictures/metronome right upper.jpg',
        '../assets/pictures/metronome right lower.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [isRunning, setIsRunning] = useState(false);
    const [bpm, setBpm] = useState(60); // Initial BPM value
    const audioRef = useRef<HTMLAudioElement | null>(null);
   

    const speed = ((60 / bpm) *1000) /4 ; // (beat) * 1000 miliseconds / 4 frames

 

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;

        if (isRunning) {
            intervalId = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    let nextIndex = prevIndex + direction;

                    if (nextIndex >= imagePaths.length) {
                        nextIndex = imagePaths.length - 2;
                        setDirection(-1);
                    } else if (nextIndex < 0) {
                        nextIndex = 1;
                        setDirection(1);
                    }

                    // Check if the current image is "middle.jpg" and play the sound
                    if (nextIndex === 2) {
                        if (audioRef.current) {
                            audioRef.current.play();
                        }
                    }

                    return nextIndex;
                });
            }, speed);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, direction, imagePaths.length, speed]);


    // Handle BPM input change
    const handleBpmChange = (event: CustomEvent) => {
        const newBpm = parseFloat(event.detail.value!);
        if (!isNaN(newBpm) && newBpm >= 0) {
            setBpm(newBpm);
        }
    };

    return (
        <IonContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <img
                        src={`assets/${imagePaths[currentImageIndex]}`}
                        alt="Metronome"
                        style={{ maxWidth: '90%', maxHeight: '50vh', width: 'auto' }} 
                    />
                </div>
             
                    <IonButtons slot="primary" className="ion-text-center">
                        <IonButton                                //Start Button
                            onClick={() => setIsRunning(true)}
                            disabled={isRunning}
                            shape="round"
                            style={{ fontSize: '4vw', padding: '2vh 4vw' }} 
                        >
                            Start
                        </IonButton>

                        <IonButton                                //Stop Button
                            onClick={() => setIsRunning(false)}
                            disabled={!isRunning}
                            shape="round"
                            style={{ fontSize: '4vw', padding: '2vh 4vw' }} 
                        >
                            Stop
                        </IonButton>
                    </IonButtons>
                <IonItem>
                    <IonLabel position="floating">BPM</IonLabel>
                    <IonInput
                        type="number"
                        step="0.1"
                        value={bpm.toString()}
                        onIonChange={handleBpmChange}
                    ></IonInput>
                </IonItem>
            </div>
            <audio ref={audioRef}>
                <source src={sound2} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </IonContent>
    );
};

export default MetronomeContainer;
