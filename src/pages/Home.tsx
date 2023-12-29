import {  IonHeader,  IonTitle, IonToolbar, 
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,} from '@ionic/react';
import './css/Home.css';
  
import MonitoringView from '../View/MonitoringView';
import GeolocationView from '../View/GeolocationView';
import MotionView from '../View/MotionView';
import NetworkView from '../View/NetworkView'; // Importa NetworkView

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Attacker App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Attacker App</IonTitle>
          </IonToolbar>
        </IonHeader>

        <MonitoringView/>

        
        <IonCard>
          <IonCardHeader>
              <IonCardTitle>Título de la Tarjeta</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>              
            <GeolocationView/>
            <MotionView/>
            <NetworkView/>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Home;
