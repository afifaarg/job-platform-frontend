import React from "react";

const statisticsData = [
  {
    title: "Total Jobs",
    count: "150",
  },
  {
    title: "Total Users",
    count: "5000",
  },
  {
    title: "Total Organizations",
    count: "142",
  },
  {
    title: "Active Organizations",
    count: "100",
  },
  {
    title: "Total Redirects",
    count: "78",
  },
];

const StatisticsCards = () => {
  return (
    <div className="grid grid-cols-1 gap-2  mt-8 sm:grid-cols-5 px-4 ">
      {statisticsData.map((stat, index) => (
        <div
          key={index}
          className=" bg-white py-4 border rounded-lg overflow-hidden shadow-2xl"
        >
          <div className="text-center">
            <h3 className="text-base font-bold text-primary tracking-wider text-center">
              {stat.title}
            </h3>
            <p className="text-xl font-bold text-gray-700">{stat.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
