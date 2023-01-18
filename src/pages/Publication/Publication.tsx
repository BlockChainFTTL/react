import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';

const PublicationPage = (props: { match: { params: { id: any; }; }; }) => {
  const [publication, setPublication] = useState({});
  const publicationId = props.match.params.id;

  useEffect(() => {
    fetch(`https://api.example.com/publications/${publicationId}`)
      .then(response => response.json())
      .then(data => setPublication(data));
  }, []);

  const publication

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{publication.metadata.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {publication.metadata.content}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PublicationPage;
