import { ReactComponent as Logo } from "../icons/logo.svg";
import { ReactComponent as Applications } from "../icons/application.svg";
import { ReactComponent as Connections } from "../icons/connections.svg";
import { ReactComponent as Cost } from "../icons/cost.svg";
import { ReactComponent as Security } from "../icons/security.svg";
import { ReactComponent as Admin } from "../icons/admin.svg";
import { ReactComponent as Docs } from "../icons/docs.svg";
import { ReactComponent as Arrow } from "../icons/arrow.svg";
import { useState } from 'react';

const SidebarItem = ({ icon: Icon, label, beta, collapsed }) => (
  <div class="px-4 py-3 flex items-center font-semibold">
    <Icon />
    <span class={`ml-2 text-sm ${collapsed && 'hidden'}`}>{label}</span>
    {beta && <div class={`bg-[#6E27D5] text-[12px] px-2 ml-4 rounded-sm ${collapsed && 'hidden'}`}>Beta</div>}
  </div>
);

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div class={`w-1/6 bg-[#37146B] text-white flex flex-col h-auto ${collapsed && 'w-14'}`}>
      <div>
        <div class="p-[16px] flex gap-3 items-center">
          <Logo />
          <h1 class={`text-[24px] font-bold ${collapsed && 'hidden'}`}>Kapstan</h1>
        </div>
        <div class="bg-[#4D1B95] h-[0.75px] my-1" />
        <div class="bg-[#4D1B95] mx-2 my-2 px-[16px] py-[12px] rounded-md flex gap-3 items-center font-semibold">
        <div class="w-4 h-4">
        <Applications />
        </div>
        <span class={`text-sm ${collapsed && 'hidden'}`}>Applications</span>
        </div>
        <div class="bg-[#4D1B95] h-[0.75px] my-1" />
            <SidebarItem icon={Connections} label="Connections" collapsed={collapsed} />
            <SidebarItem icon={Cost} label="Cost" collapsed={collapsed} />
            <SidebarItem icon={Security} label="Security" beta collapsed={collapsed} />
            <div class="bg-[#4D1B95] h-[0.75px] my-1" />
      </div>
      <div class="mt-auto">
            <SidebarItem icon={Admin} label="Admin" collapsed={collapsed} />
            <SidebarItem icon={Docs} label="Docs" collapsed={collapsed} />
            <div class="bg-[#4D1B95] h-[0.75px] my-1" />
        <div class="px-[16px] pt-[8px] pb-[12px] flex gap-3 items-center font-semibold" onClick={handleCollapse}>
          <Arrow class="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default SideNavBar;
