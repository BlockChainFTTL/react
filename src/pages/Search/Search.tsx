import {IonList, IonPage, IonSearchbar} from '@ionic/react';
import React, {useState} from 'react';
import {client, exploreProfiles} from '../../api/api';

const Search: React.FC = () => {
    const [profiles, setProfiles] = useState([])

    async function getMatchingProfiles(text: string){
        const matchingProfiles = await client.query({
            query: exploreProfiles
        })
        setProfiles(matchingProfiles.data.exploreProfiles.items)
    }
	return(
        <>
        <IonPage>
            <IonSearchbar placeholder="Rechercher..." onChange={(value)=>getMatchingProfiles}></IonSearchbar>
            <IonList>

            </IonList>
        </IonPage>
        </>
    )
};

export default Search;