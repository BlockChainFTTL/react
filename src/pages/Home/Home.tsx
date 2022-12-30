import React, { useEffect, useState } from "react";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonTabButton, IonLabel, IonImg } from "@ionic/react";
import "./Home.css";
import { client, exploreProfiles } from "../../api/api";

const Home: React.FC = () => {
    const[profiles,setProfiles] = useState([])
    useEffect(() => {
        getFollowedProfiles()
      }, [])

    async function getFollowedProfiles() {
        const FollowedProfiles = await client.query({
            query: exploreProfiles
      })
      setProfiles(FollowedProfiles.data.exploreProfiles.items)
      console.log(FollowedProfiles.data.exploreProfiles.items)
    }

    return(
        <>
            
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonMenu>
            <IonPage id="main-content">
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Instagram</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {profiles.map((profile:any) =>(
                        <IonItem key={profile.id}>
                            <IonLabel><IonImg src={profile.picture.original.url}></IonImg>{profile.name}   {profile.stats.totalFollowers} followers</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
            </IonPage>
        </>
    );
}
export default Home;