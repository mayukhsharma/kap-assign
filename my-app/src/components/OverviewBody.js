import ServiceInfoCard from "./ServiceInfoCard";
import EventHistory from './EventHistoryCard';
import ServiceMetricsCard from './ServiceMetricsCard';

const OverviewBody = ({ selectedApp }) => {
    return (
    <>
      <ServiceInfoCard selectedApp={selectedApp} />
      <div class="flex gap-4">
      <ServiceMetricsCard selectedApp={selectedApp} />
      <EventHistory selectedApp={selectedApp} />
      </div>
    </>
    )
}

export default OverviewBody;
