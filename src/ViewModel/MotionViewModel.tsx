import { useState, useEffect } from 'react';
import { MotionRepository } from '../Repository/MotionRepository';
import { MonitoringRepository } from '../Repository/MonitoringRepository';

const useMotionViewModel = () => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const motionRepository = new MotionRepository();
  const monitoringRepository = new MonitoringRepository();

  const startListening = () => {
    motionRepository.startListening((isMoving: boolean) => {
      setIsMoving(isMoving);
      if (isMoving) {
        setTimeout(() => {
          setIsMoving(false);
        }, 5000);
      }
    });
  };

  const stopListening = () => {
    motionRepository.stopListening();
  };

  useEffect(() => {
    startListening();
    const frequency = monitoringRepository.getFrecuency();
    const intervalId = setInterval(() => {
      motionRepository.sendData(isMoving, new Date());
    }, frequency ); // Convert frequency from seconds to milliseconds

    return () => {
      stopListening();
      clearInterval(intervalId);
    };
  }, []);

  return {
    isMoving,
    startListening,
    stopListening,
  };
};

export default useMotionViewModel;