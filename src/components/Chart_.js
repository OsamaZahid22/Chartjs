import React, { Component } from "react";

import { Bar, Line } from "react-chartjs-2";

const Chart = (props) => {
  console.log("propssss", props);
  // let finalData = {
  //   labels: ,
  //   datasets: [
  //     {
  //       id: 1,
  //       label: '',
  //       data: [5, 6, 7],
  //     },
  //     {
  //       id: 2,
  //       label: '',
  //       data: [3, 2, 1],
  //     },
  //   ],
  // }
  return (
    <div>
      <Line
        datasetIdKey="id"
        data={{
          labels: ["Jun", "Jul", "Aug"],
          datasets: [
            {
              id: 1,
              label: "",
              data: [5, 6, 7],
            },
            {
              id: 2,
              label: "",
              data: [3, 2, 1],
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;
