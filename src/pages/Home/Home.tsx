import React from "react";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList } from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
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
                    Le fil d'actualité.
                </IonList>
            </IonContent>
            </IonPage>
        </>
    );
}
export default Home;