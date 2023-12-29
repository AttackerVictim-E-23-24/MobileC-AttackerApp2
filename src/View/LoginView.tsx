// Login.tsx

import React from "react";
import {
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem,
  IonCardTitle,
} from "@ionic/react";
import useLoginViewModel from "../ViewModel/LoginViewModel";

const LoginView: React.FC = () => {
  const {
    username,
    password,
    isLoading,
    error,
    setUsername,
    setPassword,
    login,
  } = useLoginViewModel();

  return (
    <IonCard>
      <IonCardTitle>
        <h1 style={{ margin: "10px" }}>Iniciar Sesión</h1>
      </IonCardTitle>
      <IonCardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <IonItem>
            <IonLabel position="floating">Usuario</IonLabel>
            <IonInput
              type="text"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          <IonButton expand="full" onClick={login} disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </IonButton>
          {error && <div>{error}</div>}
        </form>
      </IonCardContent>
    </IonCard>
  );
};

export default LoginView;
