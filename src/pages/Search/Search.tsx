import {IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonToolbar} from '@ionic/react';
import React, {useState} from 'react';
import {client, searchProfiles} from '../../api/api';

const Search: React.FC = () => {
    const [profiles, setProfiles] = useState([])

    async function getMatchingProfiles(text: string){
        console.log(text)
        const matchingProfiles = await client.query({
            query: searchProfiles,
            variables : {text}
        })
        console.log(matchingProfiles.data.search.items)
        setProfiles(matchingProfiles.data.search.items)
    }

	return(
        <>
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonSearchbar placeholder="Rechercher..." onIonChange={(event)=>getMatchingProfiles(event.target.value!)}></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList title="Profiles">
                    {profiles.map((profile:any) =>(
                        <IonItem key={profile.id}>
                            <IonLabel>
                                {/* {profile.picture.original !== undefined && profile.picture.original.url !== null && <IonImg src={profile.picture.original.url}></IonImg>}
                                {profile.picture.uri !== undefined && profile.picture.uri !== null && <IonImg src={profile.picture.uri}></IonImg>} */}
                                {profile.name}    {profile.stats.totalFollowers} followers</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                <IonList title="Publications">
                    
                </IonList>
            </IonContent>
        </IonPage>
        </>
    )
};

export default Search;