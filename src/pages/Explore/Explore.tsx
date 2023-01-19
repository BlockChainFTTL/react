import { IonPage, IonContent, IonList, IonCard, IonItem, IonText, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCol, IonCardSubtitle } from "@ionic/react";
import { chatboxOutline, heartOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { client } from "../../api/api";
import { queryExplorePublications } from "../../api/profil/queries";

const Explore:React.FC = () => {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        ExplorePublications();
    })

    async function ExplorePublications(){
        const ExploreProfiles = await client.query({
            query: queryExplorePublications
        })
        setPublications(ExploreProfiles.data.explorePublications.items)
    }

    return(
        <IonPage>
            <IonContent>
                <IonList>
                    {publications.map((publication:any) => (
                        <IonItem key={publication.id}>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardSubtitle>
                                        {publication.profile.handle}
                                    </IonCardSubtitle>
                                    <h3>{publication.metadata.name !== null && publication.metadata.name}</h3>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonText>{publication.metadata.content !== null && publication.metadata.content}</IonText>
                                </IonCardContent>
                            </IonCard>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Explore;