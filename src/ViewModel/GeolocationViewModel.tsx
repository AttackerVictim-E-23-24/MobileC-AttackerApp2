import { useState, useEffect } from 'react';
import { GeolocationRepository } from '../Repository/GeolocationRepository';
import { GeolocationModel } from '../Model/GeolocationModel';
import { MonitoringRepository } from '../Repository/MonitoringRepository';

const useGeolocationViewModel = () => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<string | null>(null);

  const geolocationModel = new GeolocationModel();
  const geolocationRepository = new GeolocationRepository(geolocationModel);
  const monitoringRepository = new MonitoringRepository();

  useEffect(() => {
    const fetchGeolocation = async () => {
      await geolocationRepository.setCurrentPosition();
      setLatitude(geolocationModel.getLatitude().toFixed(5));
      setLongitude(geolocationModel.getLongitude().toFixed(5));
      setAccuracy(geolocationModel.getAccuracy().toFixed(5));
    };

    fetchGeolocation();

    const frequency = monitoringRepository.getFrecuency();
    const intervalId = setInterval(() => {
        geolocationRepository.sendData();
    }, frequency ); // Convert frequency from seconds to milliseconds

    return () => clearInterval(intervalId);
  }, [geolocationRepository, geolocationModel, monitoringRepository]);

  return {
    latitude,
    longitude,
    accuracy,
  };
};

export default useGeolocationViewModel;