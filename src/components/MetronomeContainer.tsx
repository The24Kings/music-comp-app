import './MetronomeContainer.css';
import React, { useState, useEffect, useReducer, useRef, useCallback } from 'react';
import { IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonToolbar } from '@ionic/react';

import Roundy from 'roundy';

import sound1 from "/assets/sounds/metronomeSound1.mp3";
import sound2 from "/assets/sounds/metronomeSound2.mp3";
import sound3 from "/assets/sounds/metronomeSound3.mp3";

interface ContainerProps {
    name: string;
    selectedSound: string;
}

export const useAnimationFrame = (
    cb: (arg: { time: number; delta: number }) => void,
    deps: readonly unknown[],
) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    if (typeof window === 'undefined') return

    const frame = useRef<number>()
    const last = useRef(performance.now())
    const init = useRef(performance.now())

    const animate = useCallback(() => {
    const now = performance.now()
    const time = (now - init.current) / 1_000
    const delta = (now - last.current) / 1_000

    // eslint-disable-next-line n/callback-return, n/no-callback-literal, promise/prefer-await-to-callbacks
    cb({ time, delta })

    last.current = now
    frame.current = requestAnimationFrame(animate)
    }, [cb])

    useEffect(() => {
        frame.current = requestAnimationFrame(animate)
        return () => {
            if (frame.current) cancelAnimationFrame(frame.current)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animate, ...deps])
    /* eslint-enable react-hooks/rules-of-hooks */
}

const MetronomeContainer: React.FC<ContainerProps> = ({ selectedSound, name }) => {
    //TODO: Change these to update based on user settings -> light | dark mode
    const metronomeBase = '../assets/pictures/metronome-grey.svg';
    const metronomeArm = '../assets/pictures/arm-white.svg';

    const [isRunning, setIsRunning] = useState(false);
    const [bpm, setBpm] = useState(130); // Initial BPM value
    const audioRef = useRef<HTMLAudioElement>(null);
    const [prevAngle, setPrev] = useState(0);
    const time = performance.now() / 1000;
    const armRef = useRef<HTMLImageElement>(null)
    const soundMap: { [key: string]: string } = {
        sound1: sound1,
        sound2: sound2,
        sound3: sound3,
    };

    useAnimationFrame(({ time }) => {
        const img = armRef.current

        if (!img) return
        if (!isRunning) return

        // Calculate current angle of metronome arm
        const frequency = bpm / 60.0;
        const angle = Math.sin(time * Math.PI / 60 * bpm);
        const degrees = angle * 30;

        // Check if angle crossed zero
        // TODO: Fix bug when updating bpm, audio will play out of sync, delayed or too fast
        if (angle < 0 && prevAngle >= 0 || angle >= 0 && prevAngle < 0) {
            if (audioRef.current) {
                // Update the audio source
                audioRef.current.src = soundMap[selectedSound];

                // Listen for the completion of the 'load' operation
                audioRef.current.addEventListener('loadeddata', () => {
                    // Once loaded, play the audio
                    audioRef.current!.play();
                });

                // Trigger the 'load' operation
                audioRef.current.load();
            }
        }

        // Set Previous angle for future comparison
        setPrev(angle);

        img.style.transform = `rotate(${degrees}deg)`
    }, [bpm, isRunning, soundMap, selectedSound])

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
                        src={`${metronomeBase}`}
                        alt="Metronome"
                        style={{ position: `relative` }}
                    />
                    <img
                        src={`${metronomeArm}`}
                        alt="Metronome Arm"
                        ref={armRef}
                        style={{ position: `absolute` }}
                    />
                </div>

                <IonButtons slot="primary" className="ion-text-center">
                    <IonButton                                //Start Button
                        onClick={() => setIsRunning(true)}
                        disabled={isRunning}
                        shape="round"
                        style={{ fontSize: '2vw', padding: '2vh 4vw' }}
                    >
                        Start
                    </IonButton>

                    <IonButton                                //Stop Button
                        onClick={() => setIsRunning(false)}
                        disabled={!isRunning}
                        shape="round"
                        style={{ fontSize: '2vw', padding: '2vh 4vw' }}
                    >
                        Stop
                    </IonButton>
                </IonButtons>
            </div>
                <div className="slider">
                    <Roundy
                        value={bpm}
                        min={5}
                        max={250}
                        rotationOffset={90}
                        stepSize={5}
                        color="red"
                        bgColor="gray"
                        strokeWidth={10}
                        radius={100}
                        onChange={bpm => setBpm(bpm)} // Change to onAfterChange
                    />
                </div>

                <div className="bpmButtons">
                    <IonButtons slot="primary" className="ion-text-center">
                        <IonButton
                            shape="round"
                            style={{ fontSize: '4vw', padding: '2vh 4vw' }}
                            onClick={() => setBpm(bpm - 1)}
                        >
                            -
                        </IonButton>

                        <IonItem>
                            <IonLabel position="floating">BPM</IonLabel>
                            <IonInput
                                type="number"
                                step="0.1"
                                value={bpm.toString()}
                                onIonChange={handleBpmChange}
                            ></IonInput>
                        </IonItem>

                        <IonButton
                            shape="round"
                            style={{ fontSize: '4vw', padding: '2vh 4vw' }}
                            onClick={() => setBpm(bpm + 1)}
                        >
                            +
                        </IonButton>
                    </IonButtons>
                </div>

            <audio ref={audioRef}>
                <source src={soundMap[selectedSound]} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </IonContent>

    );
};

export default MetronomeContainer;