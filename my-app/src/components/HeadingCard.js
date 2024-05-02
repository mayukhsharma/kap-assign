import { useState } from "react";
import { ReactComponent as GreenDot } from "../icons/greenDot.svg";
import { ReactComponent as ThreeDots } from "../icons/dots.svg";
import { ReactComponent as Overview } from "../icons/overview.svg";
import { ReactComponent as EventHistory } from "../icons/eventHistory.svg";
import { ReactComponent as EnvironmentVariable } from "../icons/envVariable.svg";
import { ReactComponent as Alerts } from "../icons/alerts.svg";
import { ReactComponent as AlertRedDot } from "../icons/alertRedDot.svg";
import { ReactComponent as RedDot } from "../icons/redDot.svg";
import EnvVariableBody from "./EnvVariableBody";
import OverviewBody from "./OverviewBody";

const HeadingCard = ({ selectedApp }) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const renderComponent = () => {
    switch (selectedTab) {
      case "overview":
        return <OverviewBody selectedApp = {selectedApp} />;
      case "environment":
        return <EnvVariableBody />
      default:
        return null;
    }
  };

  return (
    <div class="my-4 mx-8">
      <div class="flex">
        <h1 class="text-xl font-bold">{selectedApp ? selectedApp.name : 'Select Application'}</h1>
        <div class="flex gap-1 ml-auto items-center">
          <div class={`flex items-center text-[14px] px-2 ${selectedApp && selectedApp.status === 'uninstalled' ? 'text-[#E91F04]' : 'text-[#00B88C]'} ${selectedApp && selectedApp.status === 'uninstalled' ? 'bg-[#FEF4F2]' : 'bg-[#F0FCF9]'} ${selectedApp && selectedApp.status === 'uninstalled' ? 'border-[#E91F04]' : 'border-[#00B88C]'} border rounded-md`}>
            {selectedApp && selectedApp.status === 'uninstalled' && <RedDot />}
            {selectedApp && selectedApp.status !== 'uninstalled' && <GreenDot />}
            {selectedApp ? selectedApp.status : 'status'}
          </div>
          <ThreeDots />
        </div>
      </div>
      <div class="flex gap-4 text-sm text-[#595959] mt-2 cursor-pointer">
        <div class={`flex items-center gap-1 ${selectedTab === "overview" && "font-bold"}`} onClick={() => setSelectedTab("overview")}>
          <Overview />
          Overview
        </div>
        <div class={`flex items-center gap-1 ${selectedTab === "environment" && "font-bold"}`} onClick={() => setSelectedTab("environment")}>
          <EnvironmentVariable />
          Environment Variables
        </div>
        <div class="flex">
          <div class="flex items-center gap-1">
            <Alerts />
            Alerts
          </div>
          <AlertRedDot />
        </div>
        <div class="flex items-center gap-1">
          <EventHistory />
          Event History
        </div>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default HeadingCard;
