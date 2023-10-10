import {
    IonContent,
    IonHeader,
    IonPage,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonMenuButton
} from '@ionic/react';

import {
    ellipsisHorizontal,
    ellipsisVertical
} from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import MetronomeContainer from '../components/MetronomeContainer';

interface MetronomeProps {
    selectedSound: string;
}

const Metronome: React.FC<MetronomeProps> = ({ selectedSound }) => {
    useEffect(() => {
        console.log('Selected Sound in Metronome:', selectedSound);
    }, [selectedSound]);

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton autoHide={false}></IonMenuButton>
                </IonButtons>
                <IonTitle size="large">Metronome</IonTitle>
            </IonToolbar>

            <IonContent fullscreen>
                {/* Pass the selectedSound prop with a default value */}
                <MetronomeContainer selectedSound={selectedSound} name="Metronome page" />
            </IonContent>
        </IonPage>
    );
};

export default Metronome;