import { useState } from 'react';
import { ReactComponent as TopArrow } from "../icons/topArrow.svg";
import { ReactComponent as GreenTick } from "../icons/greenTick.svg";

const ServiceInfoCard = ({ selectedApp }) => {
    const [isShrunk, setIsShrunk] = useState(false);
    if (!selectedApp || !selectedApp.updatedAt) {
        return (
            <div class={`my-4 border border-[#EBEBEB] rounded-md p-4 bg-[#FFFFFF] ${isShrunk ? 'h-16' : ''}`}>
            <div class="flex mb-2">
                <h1 class="text-[#595959] font-bold text-lg">Service info</h1>
                <TopArrow class="ml-auto cursor-pointer" onClick={() => setIsShrunk(!isShrunk)} />
            </div>
            {!isShrunk && (
                <div class="flex gap-12 mb-8">
                    <div>
                        <h1 class="text-xs text-[#595959] font-semibold mb-1">Current version</h1>
                        <div class="flex gap-1 items-center">
                            <GreenTick />
                            <h1 class="text-sm text-[#333333]">In sync</h1>
                        </div>
                    </div>
                    <div>
                        <h1 class="text-xs text-[#595959] font-semibold mb-1">Desired version</h1>
                        <h1 class="text-sm text-[#333333]">version</h1>
                    </div>
                </div>
            )}
            {!isShrunk && (
                <div class="flex items-center">
                    <div class="bg-[#6E27D5] py-2 px-6 rounded-md text-white text-[14px] font-semibold">Deploy</div>
                    <h1 class="text-[#595959] text-xs ml-auto">Last updated x hours ago</h1>
                </div>
            )}
        </div>
        )
    }
    const timestamp = selectedApp.updatedAt;
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours(); // Get the hours from the date

    return (
        <div class={`my-4 border border-[#EBEBEB] rounded-md p-4 bg-[#FFFFFF] ${isShrunk ? 'h-16' : ''}`}>
            <div class="flex mb-2">
                <h1 class="text-[#595959] font-bold text-lg">Service info</h1>
                <TopArrow class="ml-auto cursor-pointer" onClick={() => setIsShrunk(!isShrunk)} />
            </div>
            {!isShrunk && (
                <div class="flex gap-12 mb-8">
                    <div>
                        <h1 class="text-xs text-[#595959] font-semibold mb-1">Current version</h1>
                        <div class="flex gap-1 items-center">
                            <GreenTick />
                            <h1 class="text-sm text-[#333333]">{selectedApp.version===selectedApp.desiredVersion?'In sync':selectedApp.version}</h1>
                        </div>
                    </div>
                    <div>
                        <h1 class="text-xs text-[#595959] font-semibold mb-1">Desired version</h1>
                        <h1 class="text-sm text-[#333333]">{selectedApp.desiredVersion}</h1>
                    </div>
                </div>
            )}
            {!isShrunk && (
                <div class="flex items-center">
                    <div class="bg-[#6E27D5] py-2 px-6 rounded-md text-white text-[14px] font-semibold">Deploy</div>
                    <h1 class="text-[#595959] text-xs ml-auto">Last updated {hours} hours ago</h1>
                </div>
            )}
        </div>
    )
}

export default ServiceInfoCard;
