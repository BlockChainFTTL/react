import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonBackButton, IonButtons, IonTitle, IonToolbar, IonCardSubtitle, IonText } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { client } from '../../api/api';
import { getPublicationById } from '../../api/publication/queries';
import { hideTabs, showTabs } from '../../App';

const Publication:React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [title,setTitle] = useState("");
  const [creator,setCreator] = useState("");
  const [content,setContent] = useState("");
  const [profileId,setProfileId] = useState("");

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
    setTitle(PublicationInfo.data.publication.metadata.name)
    setCreator(PublicationInfo.data.publication.profile.handle)
    setContent(PublicationInfo.data.publication.metadata.content)
    setProfileId(PublicationInfo.data.publication.profile.id)
  }

  // async function getComments(){
  //   const comments = await client.query({
  //     query: getComments,
  //     variables: {profileId, id}
  //   })
  //   setComments(comments.data.comments.items)
  // }

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
          <IonCardSubtitle>
            {creator}
          </IonCardSubtitle>
            <h3>{title}</h3>
        </IonCardHeader><IonCardContent>
          <IonText>{content}</IonText>
        </IonCardContent>
        
      </IonCard>
    </IonContent>
    </IonPage>
  );
};

export default Publication;
