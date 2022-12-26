import {IonPage, IonSearchbar} from '@ionic/react';

const Search: React.FC = () => {
	return(
        <>
        <IonPage>
            <IonSearchbar placeholder="Rechercher..."></IonSearchbar>
        </IonPage>
        </>
    )
};

export default Search;