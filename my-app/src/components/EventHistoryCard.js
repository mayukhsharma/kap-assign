import { useEffect, useState } from "react";
import { ReactComponent as RedDot } from "../icons/redDot.svg";
import { ReactComponent as GreenDot } from "../icons/greenDot.svg";
import { ReactComponent as YellowDot } from "../icons/yellowDot.svg";

const EventHistory = ({ selectedApp }) => {
    const [filteredData, setFilteredData] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (selectedApp) {
            fetch('https://retoolapi.dev/TYjDIe/eventhistory')
                .then(response => response.json())
                .then(data => {
                    const filtered = data.filter(item => item.applicationId === String(selectedApp.id));
                    setFilteredData(filtered);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectedApp]);    

    const convertTimestampToHours = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const hours = date.getHours();
        return hours;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_progress':
                return 'text-[#F39C12] border-[#F39C12] bg-[#FEF5E6]';
            case 'failed':
                return 'text-[#E91F04] border-[#E91F04] bg-[#FEF4F2]';
            case 'successful':
                return 'text-[#00B88C] border-[#00B88C] bg-[#F0FCF9]';
            default:
                return 'text-black border-black'; // Default color
        }
    };

    const handleViewMoreLess = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="border shadow-md w-1/2 my-4 mx-8 p-4 rounded-md bg-[#FFFFFF] ml-auto">
            <h1 className="text-[#595959] text-[16px] font-bold">Event History</h1>
            <div className="flex justify-between text-sm text-black font-semibold px-4 pt-4 pb-2">
                <h1 class="w-1/3">Event</h1>
                <h1 class="w-1/3">Version</h1>
                <h1 class="w-1/3">Status</h1>
            </div>
            <div className="bg-[#EBEBEB] h-[0.75px]"></div>
            {(filteredData && !showAll) && (
                <>
                    {filteredData.slice(0, 4).map((item, index) => (
                        <div key={item.id} className="flex justify-between px-4 py-2 items-center">
                            <div class="w-1/3">
                                <h1 className="text-sm">{item.event}</h1>
                                <h2 className="text-xs text-[#A5A5A5]">{convertTimestampToHours(item.timestamp)} hours ago</h2>
                            </div>
                            <div className="text-sm w-1/3">
                                {item.version}
                            </div>
                            <div className="w-1/3">
                            <div className={`flex w-28 items-center text-[14px] border rounded-md pr-1 ${getStatusColor(item.status)}`}>
                                {item.status === 'in_progress' && <YellowDot />}
                                {item.status === 'failed' && <RedDot />}
                                {item.status === 'successful' && <GreenDot />}
                                {item.status}
                            </div>
                            </div>
                        </div>
                    ))}
                    <button className="text-[#6E27D5] underline text-sm font-semibold px-4 py-2" onClick={handleViewMoreLess}>
                        View More
                    </button>
                </>
            )}
            {(filteredData && showAll) && (
                <>
                    {filteredData.map((item, index) => (
                        <div key={item.id} className="flex justify-between px-4 py-2 items-center">
                            <div class="w-1/3">
                                <h1 className="text-sm">{item.event}</h1>
                                <h2 className="text-xs text-[#A5A5A5]">{convertTimestampToHours(item.timestamp)} hours ago</h2>
                            </div>
                            <div className="text-sm w-1/3">
                                {item.version}
                            </div>
                            <div className="w-1/3">
                            <div className={`flex w-28 items-center text-[14px] border rounded-md pr-1 ${getStatusColor(item.status)}`}>
                                {item.status === 'in_progress' && <YellowDot />}
                                {item.status === 'failed' && <RedDot />}
                                {item.status === 'successful' && <GreenDot />}
                                {item.status}
                            </div>
                            </div>
                        </div>
                    ))}
                    <button className="text-[#6E27D5] underline text-sm font-semibold px-4 py-2" onClick={handleViewMoreLess}>
                        View Less
                    </button>
                </>
            )}
        </div>
    );
};

export default EventHistory;
