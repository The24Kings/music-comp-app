import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FilesContainer from '../components/FilesContainer';

const SavedFiles: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Saved Files</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Saved Files</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FilesContainer name="Saved Files page" />
      </IonContent>
    </IonPage>
  );
};

export default SavedFiles;
