import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonBackButton, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { client } from '../../api/api';
import { getPublicationById } from '../../api/publication/queries';

const Publication:React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [publication, setPublication] = useState<any>();

  useEffect(() => {
    getPublication();
  });

  async function getPublication(){
    const PublicationInfo = await client.query({
      query: getPublicationById,
      variables: {id}
    })
    setPublication(PublicationInfo.data.publication)
  }

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>Publication {id}</IonTitle>
      </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{publication.id}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Publication;
