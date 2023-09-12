import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Main Tabs for the app */
import { mic, alarm, download } from 'ionicons/icons';

import Recorder from './pages/Recorder';
import Metronome from './pages/Metronome';
import SavedFiles from './pages/SavedFiles';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/recorder">
            <Recorder />
          </Route>

          <Route exact path="/metronome">
            <Metronome />
          </Route>

          <Route path="/saved">
            <SavedFiles />
          </Route>

          <Route exact path="/">
            <Redirect to="/recorder" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="recorder" href="/recorder">
            <IonIcon aria-hidden="true" icon={mic} />
            <IonLabel>Recorder</IonLabel>
          </IonTabButton>

          <IonTabButton tab="metronome" href="/metronome">
            <IonIcon aria-hidden="true" icon={alarm} />
            <IonLabel>Metronome</IonLabel>
          </IonTabButton>

          <IonTabButton tab="saved" href="/saved">
            <IonIcon aria-hidden="true" icon={download} />
            <IonLabel>Saved Files</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
