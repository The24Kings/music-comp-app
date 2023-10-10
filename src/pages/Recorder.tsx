import RecordContainer from '../components/RecordContainer';
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


const Recorder: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle size="large">Recorder</IonTitle>

                        <IonButtons slot="start">
                            <IonMenuButton autoHide={false}></IonMenuButton>
                        </IonButtons>

                    </IonToolbar>
                </IonHeader>

                <RecordContainer name="Recorder page" />
            </IonContent>
        </IonPage>
    );
};

export default Recorder;
