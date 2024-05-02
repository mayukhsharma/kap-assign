import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ServiceMetricsCard = () => {
  const [data, setData] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState("CPU");

  useEffect(() => {
    fetchSelectedData();
  }, [selectedGraph]);

  const fetchSelectedData = () => {
    const apiUrl =
      selectedGraph === "CPU"
        ? "https://retoolapi.dev/Ymxfa2/cpuutilization"
        : "https://retoolapi.dev/ybFVVH/memoryutilization";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCPUButtonClick = () => {
    setSelectedGraph("CPU");
  };

  const handleMemoryButtonClick = () => {
    setSelectedGraph("Memory");
  };

  const getChartData = () => {
    if (!data) return [];

    // Organize data by applicationId
    const organizedData = {};
    data.forEach((item) => {
      if (!organizedData[item.applicationId]) {
        organizedData[item.applicationId] = [];
      }
      organizedData[item.applicationId].push({
        x: parseInt(item.timestamp) * 1000, // Convert timestamp to milliseconds
        y: parseFloat(
          selectedGraph === "CPU"
            ? item.cpuUtilization
            : item.memoryUtilization
        ),
      });
    });

    // Create series for each applicationId
    const series = [];
    for (const appId in organizedData) {
      let gameName = "";
      switch (appId) {
        case "1":
          gameName = "Tic-Tac-Toe";
          break;
        case "2":
          gameName = "Sudoku";
          break;
        case "3":
          gameName = "Chess";
          break;
        default:
          gameName = `Application ${appId}`;
      }
      series.push({
        name: gameName,
        data: organizedData[appId],
      });
    }
    return series;
  };

  const options = {
    title: {
      text:
        selectedGraph === "CPU"
          ? "CPU Utilization (%)"
          : "Memory",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Timestamp",
      },
      labels: {
        formatter: function () {
          const date = new Date(this.value);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          return hours + ":" + minutes + " " + ampm;
        },
      },
    },
    yAxis: {
      title: {
        text: "Utilization",
      },
    },
    series: getChartData(),
  };

  return (
    <div class="border shadow-md w-1/2 my-4 p-4 rounded-md bg-white">
    <h1 class="text-[#595959] text-[16px] font-bold">Service metrics</h1>
    <div class="flex justify-around text-sm text-black font-semibold px-4 pt-4 pb-2">
        <div class={`cursor-pointer text-sm ${selectedGraph==="CPU"?'text-[#6E27D5]':'text-[#595959]'} font-bold`} onClick={handleCPUButtonClick}>
            CPU
        </div>
        <div class={`cursor-pointer text-sm ${selectedGraph==="Memory"?'text-[#6E27D5]':'text-[#595959]'} font-bold`} onClick={handleMemoryButtonClick}>
            Memory
        </div>
    </div>
    {selectedGraph==="Memory"?<div class="bg-[#6E27D5] h-[1px] w-1/2 ml-auto"></div>:<div class="bg-[#6E27D5] h-[1px] w-1/2"></div>}
    <div class="bg-[#EBEBEB] h-[1px]"></div>
    <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ServiceMetricsCard;
