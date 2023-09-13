import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RecordContainer from '../components/RecordContainer';

const Recorder: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recorder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Recorder</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RecordContainer name="Recorder page" />
      </IonContent>
    </IonPage>
  );
};

export default Recorder;
