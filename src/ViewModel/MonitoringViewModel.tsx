import { useState, useEffect } from 'react';
import { MonitoringRepository } from '../Repository/MonitoringRepository';
import { LoginModel } from '../Model/LoginModel'; // Assuming LoginModel is a singleton

const useMonitoringViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [frecuency, setFrecuency] = useState(0);

  const monitoringRepository = new MonitoringRepository();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const username = LoginModel.getInstance().getUsername();
        await monitoringRepository.fetchMonitoringData(username);
        setFrecuency(monitoringRepository.getFrecuency());
        setIsSuccessful(true);
      } catch (error) {
        setIsSuccessful(false);
      }
      setIsLoading(false);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3 * 60 * 60 * 1000); // Fetch data every 3 hours

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return { isLoading, isSuccessful, frecuency };
};

export default useMonitoringViewModel;