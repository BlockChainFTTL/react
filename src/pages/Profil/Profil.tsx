import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonRow,
  IonCol
} from '@ionic/react';

const Profil: React.FC = () => {
  const [followers,setFollowers] = useState(1000);
  const [suivies,setSuivies] = useState(500);
  const [publications,setPublications] = useState([]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonRow>
              <IonCol>
                <IonAvatar slot="start">
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonCardTitle>Nom d'utilisateur</IonCardTitle>
              </IonCol>
            </IonRow>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Followers</IonLabel>
                <IonBadge slot="end">{followers}</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Suivi(e)s</IonLabel>
                <IonBadge slot="end">{suivies}</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Publications</IonLabel>
                <IonBadge slot="end">{publications.length}</IonBadge>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        {publications.length > 0 && 
        <IonList>
          {publications.map((publication:any) =>(
            <IonItem key={publication.id} />
          ))}
        </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Profil;
