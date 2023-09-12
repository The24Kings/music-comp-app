import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Metronome: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Metronome</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Metronome</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Metronome page" />
        </IonContent>
      </IonPage>
    );
};

export default Metronome;
