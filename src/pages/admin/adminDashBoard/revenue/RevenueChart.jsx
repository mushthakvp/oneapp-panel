import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

function RevenueChart({data}) {
  useEffect(() => {
    console.log("data", data?.revenue );
    
    const options = {
      series: [
        {
          name: "Sales",
          // data: [4, 3, 10, 9, 29, 19, 22, 9, 5, 12, 7, 15], // Sample data for each month
          data: data?.revenue, // Sample data for each month
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
        // type: "datetime",
        // categories: [
        //   "2023-01-01",
        //   "2023-02-01",
        //   "2023-03-01",
        //   "2023-04-01",
        //   "2023-05-01",
        //   "2023-06-01",
        //   "2023-07-01",
        //   "2023-08-01",
        //   "2023-09-01",
        //   "2023-10-01",
        //   "2023-11-01",
        //   "2023-12-01",
        // ],
        type: "category", // Set type to category (no datetime)
        categories: data?.months,
        tickAmount: 12, // Adjust for 12 months
        // labels: {
        //   formatter: function (value, timestamp, opts) {
        //     return opts.dateFormatter(new Date(timestamp), "MMM"); // Format for month names
        //   },
        // },
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
          format: "MMM yyyy", // Format tooltip for month and year
        },
      },
      grid: {
        borderColor: "#EAEAEA", // Change this to your desired horizontal line color
      },
    };

    // Render the chart
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <div className="w-full text-xs" id="chart"></div>;
}

export default RevenueChart;
