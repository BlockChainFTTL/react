import React, { useEffect, useState } from 'react';
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
  IonCol,
  IonMenu,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import "./Profil.css"
import { client } from '../../api/api';
import { queryDefaultProfile } from '../../api/profil/queries';


const Profil: React.FC = () => {
  const [id,setId] = useState('')
  const [nombreFollowers,setNombreFollowers] = useState(10);
  const [nombreSuivies,setNombreSuivies] = useState(50);
  const [nombrePosts,setNombrePosts] = useState(3);
  const [publications,setPublications] = useState([]);
  const [nom,setNom] = useState("");
  const [biographie,setBiographie] = useState("");
  const [avatar,setAvatar] = useState("");

  useEffect(() => {
    getDefaultProfile();
    
    console.log("yo")
  })

  async function getDefaultProfile(){
    const addressEthereum = localStorage.getItem("addressEthereum");
    const defaultProfile = await client.query({
      query: queryDefaultProfile,
      variables: {addressEthereum}
    })
    setId(defaultProfile.data.defaultProfile.id)
    setNom(defaultProfile.data.defaultProfile.name)
    setNombreFollowers(defaultProfile.data.stats.totalFollowers)
    setNombreSuivies(defaultProfile.data.stats.totalFollowing)
    setNombrePosts(defaultProfile.data.stats.totalPosts)
    setBiographie(defaultProfile.data.bio)
    
    if(defaultProfile.data.profile.picture !== null && defaultProfile.data.profile.picture !== undefined){
      if(defaultProfile.data.defaultProfile.picture.uri === undefined){
          setAvatar(defaultProfile.data.profile.picture.original.url)
      }
      else{
          setAvatar(defaultProfile.data.picture.uri)
      }

      if(avatar.startsWith("ipfs://")){
        setAvatar("https://ipfs.io/ipfs/"+avatar.substring(7))
      }
    }
  }
    

  return (
    <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/addProfil">Ajouter un profil</IonItem>
          <IonItem routerLink="/profil">Changer le profil par défaut</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonRow>
              <IonCol>
                <IonAvatar>
                  <img src={avatar} />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonCardTitle>Nom d'utilisateur</IonCardTitle>
              </IonCol>
            </IonRow>
            <IonLabel>Biographie</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Followers</IonLabel>
                <IonBadge slot="end">{nombreFollowers}</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Suivi(e)s</IonLabel>
                <IonBadge slot="end">{nombreSuivies}</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Publications</IonLabel>
                <IonBadge slot="end">{nombrePosts}</IonBadge>
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
    </>
  );
};

export default Profil;
