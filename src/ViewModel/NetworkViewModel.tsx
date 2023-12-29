import { useState, useEffect } from 'react';
import { NetworkRepository } from '../Repository/NetworkRepository';

const useNetworkViewModel = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const networkRepository = new NetworkRepository();

  const checkNetworkStatus = async () => {
    await networkRepository.checkNetworkStatus();
    setIsConnected(networkRepository.getNetworkStatus());
  };

  useEffect(() => {
    checkNetworkStatus();
    const intervalId = setInterval(checkNetworkStatus, 5000); // Check network status every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    isConnected,
    checkNetworkStatus,
  };
};

export default useNetworkViewModel;