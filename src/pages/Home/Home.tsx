import React, { useEffect, useState } from "react";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonImg as IonAvatar, IonButton, IonIcon, IonChip, IonItemSliding } from "@ionic/react";
import "./Home.css";
import { client, exploreProfiles } from "../../api/api";
import { addCircleOutline } from "ionicons/icons";

const Home: React.FC = () => {
    const[profiles,setProfiles] = useState([])
    useEffect(() => {
        getFollowedProfiles()
      }, [])

    async function getFollowedProfiles() {
        var FollowedProfiles = await client.query({
            query: exploreProfiles
        })

        var items = []
        for(let i = 0; i < FollowedProfiles.data.exploreProfiles.items.length; i++){
            var item = FollowedProfiles.data.exploreProfiles.items[i];
            if(item.picture !== null && item.picture !== undefined){
                if(item.picture.uri !== null && item.picture.uri !== undefined){
                    item.picture = item.picture.uri
                }
                else if(item.picture.original !== null && item.picture.original !== undefined){
                    item.picture = item.picture.original.url
                }

                if(item.picture !== null && item.picture.startsWith('ipfs://')){
                    let result = item.picture.substring(7, item.picture.length)
                    item.picture = 'https://ipfs.io/ipfs/' + result
                }
            }

            console.log(item.picture)
        }

      setProfiles(FollowedProfiles.data.exploreProfiles.items)

    //   profiles.map((profile:any) =>(
    //     const picture = data.picture
    //     if (picture  picture.original  picture.original.url) {
    //         if (picture.original.url.startsWith('ipfs://')) {
    //         let result = picture.original.url.substring(7, picture.original.url.length)
    //         data.avatarUrl = http://lens.infura-ipfs.io/ipfs/${result}
    //         } else {
    //         data.avatarUrl = data.picture.original.url
    //         }
    //     }
    //   setProfileData(data)
    //   ))
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
                <IonTitle>InstaLens</IonTitle>
                </IonToolbar>
                <IonButtons slot="end">
                    <IonIcon icon={addCircleOutline}></IonIcon>
                </IonButtons>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {profiles.map((profile:any) =>(
                        <IonItem key={profile.id}>
                                <IonAvatar><img src={profile.picture} /></IonAvatar>
                                <IonLabel>{profile.name}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
            </IonPage>
        </>
    );
}
export default Home;