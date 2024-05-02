import { useState } from 'react';
import { ReactComponent as DownArrow } from "../icons/downArrow.svg";
import { ReactComponent as User } from "../icons/user.svg";

// Define Dropdown component outside of TopNavBar component
const Dropdown = ({ items, onSelect }) => (
  <div class="absolute top-10 left-8 mt-2 bg-white border border-gray-200 shadow-md rounded-md z-10">
    {items && items.length > 0 ? (
      items.map(item => (
        <div key={item.id} class="p-2 cursor-pointer" onClick={() => onSelect(item)}>
          {item.name}
        </div>
      ))
    ) : (
      <div class="p-2">No items available</div>
    )}
  </div>
);

const TopNavBar = ({ selectedApp, setSelectedApp, data }) => {
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false);

  const toggleAppDropdown = () => {
    setIsAppDropdownOpen(!isAppDropdownOpen);
  };

  const handleAppSelect = (app) => {
    setSelectedApp(app);
    setIsAppDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div class="relative">
      <div class="flex my-4 mx-8">
        <div>
          <h1 class="text-[#595959] text-xs font-semibold">Applications</h1>
          <div class="flex gap-2 items-center">
            <h1>{selectedApp ? selectedApp.name : 'Select Application'}</h1>
            <button onClick={toggleAppDropdown}>
              <DownArrow />
            </button>
          </div>
          {isAppDropdownOpen && <Dropdown items={data} onSelect={handleAppSelect} />}
        </div>
        <div class="flex items-center gap-2 ml-auto">
          <User />
          John Doe
          <DownArrow />
        </div>
      </div>
      <div class="bg-[#EBEBEB] h-[0.75px] my-1"></div>
    </div>
  );
};

export default TopNavBar;
