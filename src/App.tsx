import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { search, person, home, logIn, newspaperOutline, newspaper, addCircleOutline } from 'ionicons/icons';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Profil from './pages/Profil/Profil';
import Home from './pages/Home/Home';

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
import OtherProfil from './pages/Other profil/OtherProfil';
import Publication from './pages/Publication/Publication';
import AddProfil from './pages/addProfil/addProfil';
import Explore from './pages/Explore/Explore';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/login"/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/profil" component={Profil}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/publication/:id" component={Publication}/>
          <Route exact path="/OtherProfil/:id" component={OtherProfil}/>
          <Route exact path="/addProfil" component={AddProfil}/>
          <Route exact path="/explore" component={Explore}/>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
          </IonTabButton>
          <IonTabButton tab="explore" href="/explore">
            <IonIcon icon={newspaper} />
          </IonTabButton>
          <IonTabButton tab="profil" href="/profil">
            <IonIcon icon={person} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

export function hideTabs() {
  const tabsEl = document.querySelector('ion-tab-bar');
  if (tabsEl) {
    tabsEl.hidden = true;
  }
}

export function showTabs() {
  const tabsEl = document.querySelector('ion-tab-bar');
  if (tabsEl) {
    tabsEl.hidden = false;
  }
}
