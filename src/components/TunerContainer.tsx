import React, { useState } from 'react';
import { IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';

interface ContainerProps {
    name: string;
}

const TunerContainer: React.FC<ContainerProps> = ({ name }) => {
    const [audioFiles, setAudioFiles] = useState<File[]>([]);

    // Function to load audio files from the user's selection
    const loadAudioFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            setAudioFiles(selectedFiles);
        }
    };

    // Function to play the selected audio file
    const playAudio = (audioFile: File) => {
        const audioUrl = URL.createObjectURL(audioFile);
        const audio = new Audio(audioUrl);
        audio.play();
    };

    return (
        <IonContent>
            <IonButton>
                <label htmlFor="audioFileInput">Load Audio Files</label>
                <input
                    type="file"
                    id="audioFileInput"
                    accept=".mp3" // Specify the accepted file type
                    multiple
                    onChange={loadAudioFiles}
                    style={{ display: 'none' }}
                />
            </IonButton>
            <IonList>
                {audioFiles.map((audioFile, index) => (
                    <IonItem key={index}>
                        <IonLabel>{audioFile.name}</IonLabel>
                        <IonButton onClick={() => playAudio(audioFile)}>Play</IonButton>
                    </IonItem>
                ))}
            </IonList>
        </IonContent>
    );
};

export default TunerContainer;
