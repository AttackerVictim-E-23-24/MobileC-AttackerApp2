import React from 'react';
import useGeolocationViewModel from '../ViewModel/GeolocationViewModel';

const GeolocationView: React.FC = () => {
  const { latitude, longitude, accuracy } = useGeolocationViewModel();

  return (
    <>
      <h2>Geolocation</h2>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Accuracy: {accuracy}</p>
    </>
  );
};

export default GeolocationView;