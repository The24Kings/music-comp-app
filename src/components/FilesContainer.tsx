import React, { useState, useRef } from 'react';
import { IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { useMediaQuery } from 'react-responsive';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import './FilesContainer.css';
import { isPlatform } from '@ionic/react';

interface ContainerProps {
    name: string;
}

const FilesContainer: React.FC<ContainerProps> = ({ name }) => {
    const [fileImage, setFileImage] = useState('../assets/pictures/file_black.png');
    const [audioFiles, setAudioFiles] = useState<{ name: string; audio: string }[]>([]);
    const [loadedAudio, setLoadedAudio] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const querySystem = () => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        React.useEffect(() => {
            function updateTheme() {
                const systemPrefersDark = mediaQueryList.matches;
                if (systemPrefersDark) {
                    setFileImage('../assets/pictures/file_white.png');
                } else {
                    setFileImage('../assets/pictures/file_black.png');
                }
            }

            updateTheme();
            mediaQueryList.addEventListener('change', updateTheme);
            mediaQueryList.addListener((e) => e.matches && updateTheme);

            return () => {
                mediaQueryList.removeEventListener('change', updateTheme);
            };
        }, [mediaQueryList]);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const loadAudioFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);

            const selectedFile = selectedFiles[0];

            try {
                const blobUrl = URL.createObjectURL(selectedFile);

                if (isPlatform('android')) {
                    // Android specific file loading
                    const response = await fetch(blobUrl);
                    const data = await response.text();

                    setAudioFiles((prevFiles) => [
                        {
                            name: selectedFile.name,
                            audio: data,
                        },
                        ...prevFiles.slice(0, 2),
                    ]);
                } else {
                    // Web-specific file loading
                    const fileReader = new FileReader();

                    fileReader.onload = (event) => {
                        const result = event.target?.result as string;

                        setAudioFiles((prevFiles) => [
                            {
                                name: selectedFile.name,
                                audio: result,
                            },
                            ...prevFiles.slice(0, 2),
                        ]);
                    };

                    fileReader.readAsDataURL(selectedFile);
                }
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    querySystem();

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
                        {audioFiles.map((file, index) => (
                            <IonItem key={index} className="file_in_list">
                                <IonLabel className="file_title">
                                    <h2>{file.name}</h2>
                                </IonLabel>
                                <audio src={file.audio} controls controlsList="nodownload" className="file_audio"></audio>
                            </IonItem>
                        ))}
                    </IonList>
                </div>
            )}
        </IonContent>
    );
};

export default FilesContainer;
