import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonToolbar} from '@ionic/react';
import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {client, searchProfiles, searchPublications} from '../../api/api';

const Search: React.FC = () => {
    const [profiles, setProfiles] = useState([])
    const [publications, setPublications] = useState([])

    async function getMatchingProfiles(text: string){
        const matchingProfiles = await client.query({
            query: searchProfiles,
            variables : {text}
        })
        setProfiles(matchingProfiles.data.search.items)

        const matchingPublications = await client.query({
            query: searchPublications,
            variables : {text}
        })
        setPublications(matchingPublications.data.search.items)
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
                {profiles.length > 0 &&
                <IonList title="Profiles">
                    {profiles.length > 0 && <h2>Profiles</h2>}
                    {profiles.map((profile:any) =>(
                        <IonItem key={profile.profileId} href={"/OtherProfil/"+profile.profileId} detail={false}>
                            {/* <IonAvatar>
                                {profile.picture.original !== undefined && profile.picture.original.url !== null && <img src={profile.picture.original.url}/>}
                                {profile.picture.uri !== undefined && profile.picture.uri !== null && <img src={profile.picture.uri}/>}
                            </IonAvatar> */}
                            <IonLabel>
                                {profile.name}
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>}
                <IonList title="Publications">
                    {publications.length > 0 && <h2>Publications</h2>}
                    {publications.map((publication:any) =>(
                        <Link to={"/Publication/"+publication.id}>
                        <IonItem>
                            <IonLabel>
                                {publication.id}
                            </IonLabel>
                        </IonItem>
                        </Link>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
        </>
    )
};

export default Search;