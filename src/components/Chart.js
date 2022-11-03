import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { AutoWidthCalculator } from "ag-grid-community";
class Chart extends Component {
  constructor(props) {
    super(props);
    console.log("this", this);
    this.state = "";
  }
  componentDidMount() {
    console.log(this.props);
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };
  render() {
    console.log("this.props", this.props);
    let finalData = {
      chartData: {
        labels:
          this.props.data && this.props.data.length
            ? this.props.data.map((r) => r.Date)
            : [],
        datasets: [
          {
            label: "Working Hours",
            data:  this.props.data && this.props.data.length
            ? this.props.data.map((r) => r.diff)
            : [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },
    };
    return (
      <div className="chart">
        <Bar
          data={finalData.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              //   height:AutoWidthCalculator,
              text: "Largest Cities In " + this.props.location,
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
