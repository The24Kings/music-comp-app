import './MetronomeContainer.css';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonToolbar } from '@ionic/react';
import sound from "/assets/sounds/metronomeSound2.mp3";

interface ContainerProps {
    name: string;
    time: float;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, ...deps])
  /* eslint-enable react-hooks/rules-of-hooks */
}

const MetronomeContainer: React.FC<ContainerProps> = ({ name }) => {
    const metronomeBase = '../assets/pictures/metronome-grey.svg';
    const metronomeArm = '../assets/pictures/arm-white.svg';

    const [isRunning, setIsRunning] = useState(false);
    const [rads, setRads] = useState(0);
    const [bpm, setBpm] = useState(120); // Initial BPM value
    const [frequency, setFrequency] = useState(bpm/60);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const time = Date.now();
    const armRef = useRef<HTMLImageElement>(null)

    useAnimationFrame(({ time }) => {
        const img = armRef.current

        if (!img) return

        if (!isRunning) return

        const currentTime = Date.now();

        // IDK where the issue is, but when bpm is 120 it looks "normal"
        const frequency = bpm / 60.0;
        const timeDelta = currentTime - time;

        const adjustFrequency = frequency * Math.PI;
        const clampAmplitude = 2.0 / Math.PI;

        const angle = Math.asin(Math.sin(timeDelta * adjustFrequency)) * clampAmplitude;

       // Play sound when angle goes from positive to negative

        const rads = angle * (Math.PI / 4);

        img.style.transform = `rotate(${rads}rad)`
    }, [bpm, isRunning])

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
                        src={`${metronomeBase}`}
                        alt="Metronome"
                        style={
                            {
                                position: `relative`
                            }
                        }
                    />
                    <img
                        src={`${metronomeArm}`}
                        alt="Metronome Arm"
                        ref={armRef}
                        style={
                            {
                                position: `absolute`,
                                top: `0`,
                                bottom: `0`
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
