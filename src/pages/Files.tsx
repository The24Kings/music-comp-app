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

import FilesContainer from '../components/FilesContainer';

const Tuner: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle size="large">Files</IonTitle>

                        <IonButtons slot="start">
                            <IonMenuButton autoHide={false}></IonMenuButton>
                        </IonButtons>

                    </IonToolbar>
                </IonHeader>

                <FilesContainer name="Files Page" />
            </IonContent>
        </IonPage>
    );
};

export default Tuner;
