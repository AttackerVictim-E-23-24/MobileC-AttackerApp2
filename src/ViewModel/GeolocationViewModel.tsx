import { useState, useEffect } from 'react';
import { GeolocationRepository } from '../Repository/GeolocationRepository';
import { GeolocationModel } from '../Model/GeolocationModel';
import { MonitoringModel } from '../Model/MonitoringModel';
import { GeolocationLocal } from '../Local/GeolocationLocal'; // Import the GeolocationLocal class

const useGeolocationViewModel = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number >();
  const [isDataReady, setIsDataReady] = useState<boolean>(false); // New state

  const geolocationModel = new GeolocationModel();
  const geolocationRepository = new GeolocationRepository(geolocationModel);
  const monitoringModel = MonitoringModel.getInstance();
  const geolocationLocal = new GeolocationLocal(); // Create an instance of GeolocationLocal

  const startListening = async () => {
    await geolocationRepository.setCurrentPosition();
    setLatitude(geolocationModel.getLatitude());
    setLongitude(geolocationModel.getLongitude());
    setAccuracy(geolocationModel.getAccuracy());
    setIsDataReady(true); // Set isDataReady to true after setting geolocation data
  };

  // Start listening when the component mounts
  useEffect(() => {
    startListening();
  }, []);

  // Send data at the frequency specified by monitoringModel
  useEffect(() => {
    const frequency = monitoringModel.getFrecuency() * 1000; // Convert frequency from seconds to milliseconds
    const intervalId = setInterval(() => {
      if (isDataReady) { // Check if data is ready before sending
        geolocationRepository.sendData(latitude, longitude, new Date()); 
      }
    }, frequency);

    return () => {
      clearInterval(intervalId);
    };
  }, [monitoringModel.getFrecuency(), latitude, longitude, isDataReady]); // Add isDataReady to dependency array

  return {
    latitude,
    longitude,
    accuracy,
    startListening,
  };
};

export default useGeolocationViewModel;