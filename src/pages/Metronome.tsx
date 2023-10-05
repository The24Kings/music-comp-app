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

import MetronomeContainer from '../components/MetronomeContainer';

interface MetronomeProps {
    selectedSound: string;
}

const Metronome: React.FC<MetronomeProps> = ({ selectedSound }) => {
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton autoHide={false}></IonMenuButton>
                </IonButtons>
                <IonTitle size="large">Metronome</IonTitle>
            </IonToolbar>

            <IonContent fullscreen>
                <MetronomeContainer name="Metronome page" selectedSound={selectedSound} />
            </IonContent>
        </IonPage>
    );
};

export default Metronome;
