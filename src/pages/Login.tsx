import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem, IonHeader, IonTitle, IonToolbar
} from '@ionic/react';
import LoginView from '../View/LoginView';
import ChangePasswordView from '../View/ChangePasswordView'; // Importa ChangePasswordView

const Login: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handlePasswordChanged = () => {
    setIsLoginView(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Attacker App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isLoginView ? <LoginView/> : <ChangePasswordView onPasswordChanged={handlePasswordChanged}/>}
        <p onClick={() => setIsLoginView(!isLoginView)}>
          {isLoginView ? 'Cambiar a vista de cambio de contraseña' : 'Cambiar a vista de login'}
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;