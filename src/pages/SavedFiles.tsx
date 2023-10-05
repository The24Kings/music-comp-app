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

const SavedFiles: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle size="large">Saved Files</IonTitle>
                       
                            <IonButtons slot="start">
                                <IonMenuButton autoHide={false}></IonMenuButton>
                            </IonButtons>
                      
                    </IonToolbar>
                </IonHeader>

                <FilesContainer name="Saved Files page" />
            </IonContent>
        </IonPage>
    );
};

export default SavedFiles;
