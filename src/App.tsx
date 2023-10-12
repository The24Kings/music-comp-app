import {
    IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonMenuToggle, IonLabel, IonItem, IonIcon, setupIonicReact, IonSelect, IonSelectOption
} from '@ionic/react';

import React, { useState, useEffect } from 'react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Main Tabs for the app */
import {
    mic, alarm, download
} from 'ionicons/icons';

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
const App: React.FC = () => {
    const [selectedSound, setSelectedSound] = useState('sound2'); // Initial sound

    const handleSoundChange = (event: CustomEvent) => {
        console.log('Selected Sound:', event.detail.value);
        setSelectedSound(event.detail.value);
    };

    useEffect(() => {
        // console.log('Updated State in App:', selectedSound);
    }, [selectedSound]);
    return (
        <IonApp>
            <IonReactRouter>
                <IonMenu contentId="main-content" type="overlay">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Settings</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonMenuToggle auto-hide="false">
                                {/* Sound selection option */}
                                <IonItem>
                                    <IonLabel>Metronome Sound</IonLabel>
                                    <IonSelect value={selectedSound} onIonChange={handleSoundChange}>
                                        <IonSelectOption value="sound1">Sound 1</IonSelectOption>
                                        <IonSelectOption value="sound2">Sound 2</IonSelectOption>
                                        <IonSelectOption value="sound3">Sound 3</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonMenuToggle>
                        </IonList>
                    </IonContent>
                </IonMenu>

                <IonTabs>
                    <IonRouterOutlet id="main-content">
                        <Route path="/recorder" component={Recorder} exact />
                        <Route path="/metronome" render={() => <Metronome selectedSound={selectedSound} />} exact />
                        <Route path="/saved" component={SavedFiles} exact />
                        <Redirect from="/" to="/recorder" exact />
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
};

export default App;