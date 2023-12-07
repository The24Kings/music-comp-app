import React, { useState, useRef } from 'react';
import { IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { useMediaQuery } from 'react-responsive';

import './FilesContainer.css';

interface ContainerProps {
    name: string;
}

const FilesContainer: React.FC<ContainerProps> = ({ name }) => {

    //Change button image based on the user's system preferences
    const [fileImage, setFileImage] = useState('../assets/file_black.png');

    function querySystem(){
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        React.useEffect(() => {
            function updateTheme(){
                const systemPrefersDark = mediaQueryList.matches;
                if (systemPrefersDark){
                    //console.log('system prefers dark')
                    setFileImage('../assets/file_white.png')
                }
                else{
                    //console.log('system prefers light')
                    setFileImage('../assets/file_black.png')
                }
            }

          updateTheme();
            mediaQueryList.addEventListener("change", updateTheme)
            mediaQueryList.addListener(e => e.matches && updateTheme)

            return () => {
                mediaQueryList.removeEventListener("change", updateTheme)
            };
        }, [mediaQueryList]);
    };

    querySystem();

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

    return (
        <IonContent>
            <div className="audio-controls">
                <img id="object" src={`${fileImage}`} />
            </div>

            <div className="load_container">
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
                <div className="loaded_files">
                    <IonList inset={true} className="list_inset">
                        {audioFiles.slice(0).map((audioFile, index) => (
                            <IonItem key={index} className="file_in_list">
                                {/* Display the file name text within the new height space */}
                                <IonLabel className="file_title">
                                    <h2>{audioFile.name}</h2>
                                </IonLabel>
                                {/* Display the audio player */}
                                <audio src={URL.createObjectURL(audioFile)} controls controlsList="nodownload" className="file_audio"></audio>
                            </IonItem>
                        ))}
                    </IonList>
                </div>
            )}
        </IonContent>
    );
};

export default FilesContainer;
