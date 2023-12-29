import React, { useState } from 'react';
import useChangePasswordViewModel from '../ViewModel/ChangePasswordViewModel';
import { IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonCardTitle } from '@ionic/react';

const ChangePasswordView: React.FC<{ onPasswordChanged: () => void }> = ({ onPasswordChanged }) => {
  const {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    sendEmail,
    updatePassword,
    error,
  } = useChangePasswordViewModel(onPasswordChanged);

  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendEmail = async () => {
    await sendEmail();
    setIsEmailSent(true);
  };

  const handleUpdatePassword = async () => {
    await updatePassword();
    setIsEmailSent(false);
  };

  return (
    <IonCard>
    <IonCardTitle>
      <h1 style={{ margin: "10px" }}>Cambio de contrasña</h1>
    </IonCardTitle>
      <IonCardContent>
        {!isEmailSent ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>
            <IonButton expand="full" onClick={handleSendEmail}>
              Enviar
            </IonButton>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <IonItem>
              <IonLabel position="floating">Código</IonLabel>
              <IonInput
                type="text"
                value={code}
                onIonChange={(e) => setCode(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Nueva contraseña</IonLabel>
              <IonInput
                type="password"
                value={newPassword}
                onIonChange={(e) => setNewPassword(e.detail.value!)}
              />
            </IonItem>
            <IonButton expand="full" onClick={handleUpdatePassword}>
              Enviar
            </IonButton>
          </form>
        )}
        {error && <p>{error}</p>}
      </IonCardContent>
    </IonCard>
  );
};

export default ChangePasswordView;