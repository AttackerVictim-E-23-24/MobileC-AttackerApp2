import { useState, useEffect } from 'react';
import { MotionRepository } from '../Repository/MotionRepository';
import { MonitoringModel } from '../Model/MonitoringModel';

const useMotionViewModel = () => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [displayIsMoving, setDisplayIsMoving] = useState<boolean>(false);
  const motionRepository = new MotionRepository();
  const monitoringModel = MonitoringModel.getInstance();

  const startListening = () => {
    motionRepository.startListening((isMoving: boolean) => {
      setIsMoving(isMoving);
    });
  };

  const stopListening = () => {
    motionRepository.stopListening();
  };

  useEffect(() => {
    startListening();
    const frequency = monitoringModel.getFrecuency() * 1000; // Convert frequency from seconds to milliseconds
    const intervalId = setInterval(() => {
      motionRepository.sendData({ movimiento: isMoving, fecha: new Date() }); // Pass network status as save parameter
    }, frequency );

    return () => {
      stopListening();
      clearInterval(intervalId);
    };
  }, [monitoringModel.getFrecuency()]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setDisplayIsMoving(isMoving);
    }, 1000); // Update displayIsMoving every 5 seconds

    return () => {
      clearInterval(timerId);
    };
  }, [isMoving]);

  return {
    isMoving: displayIsMoving,
    startListening,
    stopListening,
  };
};

export default useMotionViewModel;