import {
    IonContent,
    IonHeader,
    IonPage,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons
} from '@ionic/react';

import {
    ellipsisHorizontal,
    ellipsisVertical
} from 'ionicons/icons';

import MetronomeContainer from '../components/MetronomeContainer';
import ImageSlideshow from '../components/ImageSlideshow';

const Metronome: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle size="large">Metronome</IonTitle>
                        <IonButtons slot="primary">
                            <IonButton>
                                <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <MetronomeContainer name="Metronome page" />
            </IonContent>
        </IonPage>
  );
};

export default Metronome;
