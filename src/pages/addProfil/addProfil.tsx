import { IonBackButton, IonButtons, IonContent, IonHeader, IonInput, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect } from "react";
import { hideTabs, showTabs } from "../../App";

const AddProfil: React.FC = () => {

    useEffect (() => {
        hideTabs()

        return() => {
            showTabs()
        }
    })
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
                <IonInput key="handleName" placeholder="Nom du profil à ajouter (Obligatoire)"></IonInput>
                <IonInput key="profilePictureUri" placeholder="URL de la photo de profil (Optionnel)"></IonInput>
                <IonInput key="followNFTURI" placeholder="URL du NFT à follow (Optionnel)"></IonInput>
                <IonSelect placeholder="Choisir un type de follow (Optionnel)">
                    <IonSelectOption key="freeFollowModule">Tout le monde peut vous follow gratuitement</IonSelectOption>
                    <IonSelectOption key="revertFollowModule">Personne ne peut vous follow</IonSelectOption>
                    <IonSelectOption key="feeFollowModule">Appliquer une taxe lors du follow</IonSelectOption>
                </IonSelect>
            </IonContent>
        </IonPage>
)}

export default AddProfil;