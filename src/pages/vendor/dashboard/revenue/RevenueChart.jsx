import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

function RevenueChart({ data }) {
  useEffect(() => {
    const options = {
      series: [
        {
          name: "Revenue",
          data: data?.revenueData, // Sample data for each month
        },
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      xaxis: {
        type: "category", // Set type to category (no datetime)
        categories: data?.months, // Use month names as categories
        tickAmount: 12, // 12 ticks for 12 months
        labels: {
          style: {
            colors: "#000", // Optional: Set the label color
            fontSize: "12px", // Optional: Set the font size
          },
        },
      },
      colors: ["#FFBEBF"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#DB181A"], // Ending color
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      markers: {
        size: 6, // Size of the marker
        strokeWidth: 3, // Width of the border
        strokeColors: ["#AE8FF7"], // Border color
        colors: ["white"], // Inner color
      },
      tooltip: {
        x: {
          format: "MMM", // Format tooltip for month names only
        },
      },
      grid: {
        borderColor: "#EAEAEA", // Grid color
      },
    };

    // Render the chart
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div className="w-full text-xs" id="chart"></div>;
}

export default RevenueChart;
