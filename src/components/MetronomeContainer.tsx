import './MetronomeContainer.css';

import React, { useState, useEffect, useRef } from 'react';
import { IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonToolbar } from '@ionic/react';
import sound from "/assets/sounds/metronomeSound2.mp3";

interface ContainerProps {
    name: string;
}

const MetronomeContainer: React.FC<ContainerProps> = ({ name }) => {
    const metronomeBase = '../assets/pictures/metronome.svg';
    const metronomeArm = '../assets/pictures/arm.svg';

    const [isRunning, setIsRunning] = useState(true);
    const [rads, setRads] = useState(0);
    const [frequency, setFrequency] = useState(120/60);
    const [bpm, setBpm] = useState(60); // Initial BPM value
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const amplitude = 10; // Smoothness of the animation -> Placeholder
    const time = Date.now();

    //Thinks it is event driven, maybe, please look into
    useEffect(() => {
         if(isRunning) {
            const currentTime = Date.now();

            const frequency = bpm / 60;
            const timeDelta = currentTime - time; // In milliseconds

            const angle = Math.asin(Math.sin(timeDelta - (0.5 / frequency) * (frequency * Math.PI) + (Math.PI / 2))) * (2 / Math.PI);

            setRads(angle * (Math.PI / 4));
         }
    }, [isRunning, frequency, rads]);

    // Handle BPM input change
    const handleBpmChange = (event: CustomEvent) => {
        const newBpm = parseFloat(event.detail.value!);
        if (!isNaN(newBpm) && newBpm >= 0) {
            setBpm(newBpm);
        }
    };

    return (
        <IonContent>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }
            }>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <img
                        src={`${metronomeArm}`}
                        alt="Metronome Arm"
                        style={
                            {
                                maxWidth: '90%',
                                maxHeight: '50vh',
                                width: 'auto',
                                transform: `rotate(${rads}rad)`
                            }
                        }/>
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
                <source src={sound} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </IonContent>

    );
};

export default MetronomeContainer;
