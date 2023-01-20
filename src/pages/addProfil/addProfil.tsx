import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { client } from "../../api/api";
import { createProfile } from "../../api/profil/mutations";
import { hideTabs, showTabs } from "../../App";

const AddProfil: React.FC = () => {
    const [handleName, setHandleName] = useState<any>(null);
    const [profilePictureUri, setProfilePictureUri] = useState<any>(null);
    const [followNFTURI, setFollowNFTURI] = useState<any>(null);

    useEffect (() => {
        hideTabs()

        return() => {
            showTabs()
        }
    })

    async function addNewProfile(){
        const newProfile = await client.mutate({
            mutation: createProfile,
            variables: {handleName}
        })
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Profil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="center">
                <IonInput key="handleName" class="custom" placeholder="Nom du profil à ajouter (Obligatoire)" onIonChange={(event)=> setHandleName(event.target.value) }></IonInput>
                <br/>
                {/* <IonInput key="profilePictureUri" class="custom" placeholder="URL de la photo de profil (Optionnel)" onIonChange={(event)=> setProfilePictureUri(event.target.value)}></IonInput>
                <br/>
                <IonInput key="followNFTURI" class="custom" placeholder="URL du NFT à follow (Optionnel)" onIonChange={(event)=> setHandleName(event.target.value)}></IonInput>
                <IonSelect placeholder="Choisir un type de follow (Optionnel)">
                    <IonSelectOption key="freeFollowModule">Tout le monde peut vous follow gratuitement</IonSelectOption>
                    <IonSelectOption key="revertFollowModule">Personne ne peut vous follow</IonSelectOption>
                    <IonSelectOption key="feeFollowModule">Appliquer une taxe lors du follow</IonSelectOption>
                </IonSelect>
                <br/> */}
                <IonButton onClick={addNewProfile}>Ajouter un profil</IonButton>
            </IonContent>
        </IonPage>
)}

export default AddProfil;