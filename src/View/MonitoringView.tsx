import React from 'react';
import useMonitoringViewModel from '../ViewModel/MonitoringViewModel';

const MonitoringView = () => {
  const { isLoading, isSuccessful } = useMonitoringViewModel();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isSuccessful) {
    return <p>Data fetched successfully!</p>;
  }

  return <p>Failed to fetch data.</p>;
};

export default MonitoringView;