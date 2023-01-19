import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonBackButton, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { client } from '../../api/api';
import { getPublicationById } from '../../api/publication/queries';
import { hideTabs, showTabs } from '../../App';

const Publication:React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [publication, setPublication] = useState<any>();

  useEffect(() => {
    hideTabs();
    getPublication();

    return() => {
      showTabs();
    }
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
            <IonCardTitle>{publication.metadata.content}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Publication;
