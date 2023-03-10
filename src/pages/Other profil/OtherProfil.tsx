import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonRow, IonCol, IonAvatar, IonCardTitle, IonLabel, IonCardContent, IonList, IonItem, IonBadge, IonBackButton, IonButtons, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { client } from "../../api/api";
import "./OtherProfil.css";
import { getProfilById } from "../../api/profil/queries";
import { getPublicationsByProfileId } from "../../api/publication/queries";
import { hideTabs, showTabs } from "../../App";
import { mutationFollowProfile } from "../../api/follow/mutation";
  
const OtherProfil: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [followers,setFollowers] = useState(0);
    const [suivies,setSuivies] = useState(0);
    const [posts,setPosts] = useState(0);
    const [publications,setPublications] = useState([]);
    const [nom,setNom] = useState("");
    const [biographie,setBiographie] = useState("");
    const [avatar,setAvatar] = useState("");
    const [isFollowedByMe, setIsFollowedByMe] = useState(false);

    useEffect(() => {
        hideTabs();
        getProfilInfo();
        getPublications();

        return() => {
            showTabs();
        }
    });

    async function getProfilInfo(){
        const ProfilInfo = await client.query({
            query: getProfilById,
            variables: {id}
        })
        setNom(ProfilInfo.data.profile.name)
        setFollowers(ProfilInfo.data.profile.stats.totalFollowers)
        setSuivies(ProfilInfo.data.profile.stats.totalFollowing)
        setPublications(ProfilInfo.data.profile.stats.totalPosts)
        setPosts(ProfilInfo.data.profile.stats.totalPosts)
        setBiographie(ProfilInfo.data.profile.bio)
        if (ProfilInfo.data.profile.picture !== null && ProfilInfo.data.profile.picture !== undefined){
            if(ProfilInfo.data.profile.picture.uri === undefined){
                setAvatar(ProfilInfo.data.profile.picture.original.url)
            }
            else{
                setAvatar(ProfilInfo.data.picture.uri)
            }
        }
    }

    async function getPublications(){
      const publications = await client.query({
        query: getPublicationsByProfileId,
        variables: {id}
      })
      setPublications(publications.data.publications.items)
    }

    async function followProfile(){
      try{
        const follow = await client.mutate({
          mutation: mutationFollowProfile,
          variables: {id}
        })
        console.log(follow)
        setIsFollowedByMe(!isFollowedByMe)
      }
      catch(err){
        console.log("erreur : ",err)
      }

    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Profil {id}</IonTitle>
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
                  <h5>{nom}</h5>
                </IonCol>
              </IonRow>
              <IonLabel>{biographie}</IonLabel>
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
                  <IonBadge slot="end">{posts}</IonBadge>
                </IonItem>
              </IonList>
              <br />
              {isFollowedByMe === true && <IonButton onClick={followProfile}>Unfollow</IonButton>}
              {isFollowedByMe === false && <IonButton onClick={followProfile}>Follow</IonButton>}
            </IonCardContent>
          </IonCard>
          {publications.length > 0 && 
          <IonList>
            {publications.map((publication:any) =>(
              <IonItem key={publication.metadata.content} />
            ))}
          </IonList>
          }
        </IonContent>
      </IonPage>
    );
};
  
export default OtherProfil;