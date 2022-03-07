import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Setting from '../components/Setting';
// import './Tab4.css';

const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>คุณ XXXX</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">คุณ XXXX</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Setting name="Tab 4 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab4;