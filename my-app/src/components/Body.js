import { useState, useEffect } from 'react';
import TopNavBar from "./TopNavBar";
import HeadingCard from "./HeadingCard";
import ServiceInfoCard from "./ServiceInfoCard";
import EventHistory from './EventHistoryCard';
import ServiceMetricsCard from './ServiceMetricsCard';
import EnvVariableBody from './EnvVariableBody';

const Body = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://retoolapi.dev/71NNjB/applications')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div class="w-screen bg-[#F8F8F8]">
      <TopNavBar selectedApp={selectedApp} setSelectedApp={setSelectedApp} data={data} />
      <HeadingCard selectedApp={selectedApp} />
      <ServiceInfoCard selectedApp={selectedApp} />
      <div class="flex">
      <ServiceMetricsCard selectedApp={selectedApp} />
      <EventHistory selectedApp={selectedApp} />
      </div>
      <EnvVariableBody />
    </div>
  );
}

export default Body;
