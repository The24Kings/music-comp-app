import React, { useState, useRef } from 'react';
import { IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';

interface ContainerProps {
    name: string;
}

const TunerContainer: React.FC<ContainerProps> = ({ name }) => {
    const [audioFiles, setAudioFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Function to load audio files from the user's selection
    const loadAudioFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);

            // Update state with only the last 5 audio files
            setAudioFiles((prevFiles) => {
                const updatedFiles = [...selectedFiles, ...prevFiles].slice(0, 3);
                return updatedFiles;
            });
        }
    };

    // Function to trigger file input click
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    let fileImage = '../assets/pictures/file_black.png';

    const querySystem: UseMediaQuery = (query) => {
        const mediaQueryList = window.matchMedia(query);
        return mediaQueryList.matches;
    };

    const systemPrefersDark = () => {
        return querySystem('(prefers-color-scheme: dark)');
    };

    let prefersDarkMode = systemPrefersDark();
    if (prefersDarkMode) {
        fileImage = '../assets/pictures/file_white.png';
    }

    return (
        <IonContent>
            <div className="audio-controls">
                <img id="object" src={`${fileImage}`} /> </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <IonButton onClick={triggerFileInput}>Load Audio Files</IonButton>
                <input
                    ref={fileInputRef}
                    type="file"
                    id="audioFileInput"
                    accept=".mp3"
                    multiple
                    onChange={loadAudioFiles}
                    style={{ display: 'none' }}
                />
            </div>
            {audioFiles.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IonList inset={true} style={{ maxWidth: '700px', width: '100%' }}>
                        {audioFiles.slice(0).map((audioFile, index) => (
                            <IonItem
                                key={index}
                                style={{ height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {/* Display the file name text within the new height space */}
                                <IonLabel style={{ textAlign: 'left', width: '100%', marginTop: '5px' }}>
                                    <h2>{audioFile.name}</h2>
                                </IonLabel>
                                {/* Display the audio player */}
                                <audio src={URL.createObjectURL(audioFile)} controls controlsList="nodownload" style={{ height: '40px', width: '40%' }}></audio>

                                
                            </IonItem>
                        ))}
                    </IonList>
                </div>
            )}
        </IonContent>
    );
};

export default TunerContainer;
