import React from 'react';
import useNetworkViewModel from '../ViewModel/NetworkViewModel';

const NetworkView: React.FC = () => {
  const { isConnected } = useNetworkViewModel();

  return (
    <>
      <p>Conexión: {isConnected ? 'Conectado' : 'Esperando conexión'}</p>
    </>
  );
};

export default NetworkView;