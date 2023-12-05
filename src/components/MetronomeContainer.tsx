import React, { useState, useEffect, useReducer, useRef, useCallback } from 'react';
import { IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonToolbar, IonIcon } from '@ionic/react';
import { useMediaQuery } from 'react-responsive'

import './MetronomeContainer.css';

import { play, stop, remove, add } from 'ionicons/icons';

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
    //Updated to change theme based on user settings -> light | dark mode
    let metronomeBase = '../assets/pictures/metronome-grey.svg';
    let metronomeArm = '../assets/pictures/arm-white.svg';

    let fillColor = "red"
    let mtColor = "gray"

    const querySystem: UseMediaQuery = (query) => {
      const mediaQueryList = window.matchMedia(query);
      return mediaQueryList.matches;
    };

    const systemPrefersDark = () => {
      return querySystem('(prefers-color-scheme: dark)');
    };

    let prefersDarkMode = systemPrefersDark();
    if (prefersDarkMode){
        console.log('system prefers dark')
        metronomeBase = '../assets/pictures/metronome-grey.svg';
        metronomeArm = '../assets/pictures/arm-white.svg';
    }
    else{
        console.log('system prefers light')
        metronomeBase = '../assets/pictures/metronome-black.svg';
        metronomeArm = '../assets/pictures/arm-white.svg';
        fillColor = "blue"
        mtColor = "azure"
    }

    const [isRunning, setIsRunning] = useState(false);
    const [bpm, setBpm] = useState(130);
    const [prevAngle, setPrev] = useState(0);
    const [angle, setAngle] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const armRef = useRef<HTMLImageElement>(null);
    const blinkRef = useRef<HTMLDivElement>(null);

    const time = performance.now() / 1000;

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
        setAngle(Math.sin(time * Math.PI / 60 * bpm));
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
                    Navigator.vibrate();
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

    function rot() {
        const img = armRef.current
        img.style.transform = `rotate(0deg)`
    }

    return (
        <IonContent>
            <div className="metronome">
                <div className="metronome-body">
                     <img className="metronome-base"
                        src={`${metronomeBase}`}
                        alt="Metronome"
                    />
                    <img
                        className="metronome-arm"
                        src={`${metronomeArm}`}
                        alt="Metronome Arm"
                        ref={armRef}
                    />
                </div>

                <div className="blink" ref={blinkRef}></div>

                <IonButtons className="metronome-buttons" slot="primary">
                    <IonButton
                        className="play"
                        onClick={() => (
                            setIsRunning(true)
                        )}
                        disabled={isRunning}
                        shape="round"
                    >
                        <IonIcon icon={play}></IonIcon>
                    </IonButton>

                    <IonButton
                        className="stop"
                        onClick={() => (
                            setIsRunning(false),
                            rot()
                        )}
                        disabled={!isRunning}
                        shape="round"
                    >
                        <IonIcon icon={stop}></IonIcon>
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
                    color={`${fillColor}`}
                    bgColor={`${mtColor}`}
                    strokeWidth={10}
                    radius={100}
                    onChange={bpm => setBpm(bpm)}
                />
            </div>

            <div>
                <IonButtons className="bpm-buttons" slot="primary">
                    <IonButton
                        className="remove"
                        shape="round"
                        onClick={() => setBpm(bpm - 1)}
                    >
                        <IonIcon slot="icon-only" icon={remove}></IonIcon>
                    </IonButton>

                    <IonItem>
                        <IonInput
                            className="bpm-input"
                            label="BPM"
                            labelPlacement="end"
                            type="number"
                            step="0.1"
                            value={bpm}
                            min={5}
                            max={250}
                            onIonChange={handleBpmChange}
                        ></IonInput>
                    </IonItem>

                    <IonButton
                        className="add"
                        shape="round"
                        onClick={() => setBpm(bpm + 1)}
                    >
                        <IonIcon slot="icon-only" icon={add}></IonIcon>
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