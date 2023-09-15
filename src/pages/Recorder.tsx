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

import RecordContainer from '../components/RecordContainer';

const Recorder: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle size="large">Recorder</IonTitle>
                        <IonButtons slot="primary">
                            <IonButton>
                                <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <RecordContainer name="Recorder page" />

            </IonContent>
        </IonPage>
    );
};

export default Recorder;
